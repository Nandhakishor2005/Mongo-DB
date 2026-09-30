const { resolve } = require("dns");
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function connect() {
    try{

        await client.connect();
        console.log("Connection Sucessfull...");

        const Dbase = client.db("hospitalDB");
        console.log("Database created sucessfully...");

        const patients = Dbase.collection("patients");
        const departments = Dbase.collection("departments");
        const doctors = Dbase.collection("doctors");

        const appointments = Dbase.collection("appointments");
        console.log("connection created Sucessfully...")

        // await departments.insertMany([
        //     { _id: 1, name: "Cardiology" },
        //     { _id: 2, name: "Neurology" },
        //     { _id: 3, name: "Orthopedics" },
        //     { _id: 4, name: "Pediatrics" },
        //     { _id: 5, name: "Dermatology" }
        // ]);

    //     const doctorsData = await doctors.insertMany([
    //     {
    //         _id: 1,
    //         name: "Dr. Smith",
    //         departmentsId: 1
    //     },
    //     {
    //         _id: 2,
    //         name: "Dr. Wilson",
    //         departmentsId: 1
    //     },
    //     {
    //         _id: 3,
    //         name: "Dr. Williams",
    //         departmentsId: 2
    //     },
    //     {
    //         _id: 4,
    //         name: "Dr. Brown",
    //         departmentsId: 2
    //     },
    //     {
    //         _id: 5,
    //         name: "Dr. Davis",
    //         departmentsId: 3
    //     },
    //     {
    //         _id: 6,
    //         name: "Dr. Miller",
    //         departmentsId: 3
    //     },
    //     {
    //         _id: 7,
    //         name: "Dr. Johnson",
    //         departmentsId: 4
    //     },
    //     {
    //         _id: 8,
    //         name: "Dr. Taylor",
    //         departmentsId: 4
    //     },
    //     {
    //         _id: 9,
    //         name: "Dr. Anderson",
    //         departmentsId: 5
    //     },
    //     {
    //         _id: 10,
    //         name: "Dr. Thomas",
    //         departmentsId: 5
    //     }
    // ])

    function askQuestion(query){
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

    async function main(){
    const existUser = await askQuestion("Are you a new User or not (Y/N) :");
    
    
    if(existUser.toUpperCase() === 'Y'){
        const userName = await askQuestion("Enter your name :");
        
        let ageChecker = true;
        let userAge;
        while(ageChecker){
            userAge = Number(await askQuestion("Please mention your age :"));
            if(userAge > 0 && userAge <= 150){
                ageChecker = false;

            }
            else{
                console.log("Enter a valid Age !!")
            }
            
        }

            let age;
            let userMob;

            while(true){
            userMob = await askQuestion("Enter your Phone Number :");

            if(/^[6-9]\d{9}$/.test(userMob)){
                break;
            }
            else{
                console.log("Enter a valid 10 digit Phone Number !!");
            }
            }

        const patientId = await patients.find().sort({_id : -1}).limit(1).toArray();
                let id;
                if(patientId.length == 0){
                    id = 100;
                    console.log(id)
                } else {
                    id = patientId[0]._id + 1;
                    console.log(id);
                }

                const patientData = await patients.insertOne({
                    _id : id,
                    userName: userName,
                    userAge: userAge,
                    userMob: userMob
                });

                console.log(`Your  Token ID is: ${id}. You need this Token for further operations!!`);


                
                console.log(" 1. Book your Appoinment");
                console.log(" 2. View your Appoinment");
                console.log(" 3. exit ?");
                let value =1;
                while(value){
                const option = await askQuestion("Please select your Option :");

                if(option == 1){
                    let userId = Number( await askQuestion("Enter Your Token ID :"));
                    console.log(userId);

                    console.log("Available Departments...");
                    const departmentList = await departments.find().toArray();
                            for(let data of departmentList){
                                console.log(`ID : ${data._id} | ${data.name}`);
                            }

                    const departmentId = Number (await askQuestion("Enter the ID of the department you want to visit : "));
                            const doctorList = await doctors.find({departmentsId : departmentId}).toArray();
                            for(let data of doctorList){
                                console.log(`ID : ${data._id} | ${data.name}`);
                            }

                    const doctorId = Number (await askQuestion("Enter the ID of the doctor you want to visit : "));
                    const selectedDoctor = doctorList.find(data => data._id === doctorId);

                    const appointment = await appointments.find().sort({_id : -1}).limit(1).toArray();

                    const appointmentData = await appointments.insertOne({
                    patientId : userId,
                    appointmentDepartment : departmentList.find(data => data._id === departmentId).name,
                    appointmentDoctor : selectedDoctor.name,
                    appointmentBooking : new Date()
                });


                    console.log("Appointment booked");
                }
        else if(option == 2){
    
            let getId = Number(await askQuestion("Enter your ID : "));

            while(getId != id){
                getId = Number(await askQuestion("Enter your Correct ID : "));
            }

            const appointmentList = await appointments.find({
                patientId: getId
            }).toArray();

            if(appointmentList.length == 0){
                console.log("No appointments found");
            }
            else{
                console.log("Your Appointments...");

                for(let data of appointmentList){
                    console.log(
                        `Department : ${data.appointmentDepartment} | Doctor : ${data.appointmentDoctor} | Booking : ${data.appointmentBooking}`
                    );
                }
            }
        }
                else if(option == 3){
                    value=0;
                    rl.close();
                    console.log("Exiting...");
                    break;

                    
                }else{
                    console.log("Enter a valid Option...")
        }
        }

    }
    else if(existUser.toUpperCase() === 'N'){

        console.log("WELCOME!!!");
        console.log("1. Book your Appoinment");
        console.log("2. View your Appoinment");
        console.log("3. Exit");

        let value = 1;

        while(value){

            const option = await askQuestion("Please select your Option :");

            if(option == 1){

                let userId = Number(await askQuestion("Enter Your Token ID :"));

                let patient = await patients.findOne({_id: userId});

                while(!patient){
                    console.log("Invalid Token ID");
                    userId = Number(await askQuestion("Enter Your Correct Token ID :"));
                    patient = await patients.findOne({_id: userId});
                }

                console.log("Available Departments...");

                const departmentList = await departments.find().toArray();

                for(let data of departmentList){
                    console.log(`ID : ${data._id} | ${data.name}`);
                }

                const departmentId = Number(await askQuestion("Enter the ID of the department you want to visit : "));
                if(!departmentId){
                    console.log(`invalid`)
                    continue;
                }

                const doctorList = await doctors.find({
                    departmentsId: departmentId
                }).toArray();

                for(let data of doctorList){
                    console.log(`ID : ${data._id} | ${data.name}`);
                }

                const doctorId = Number(
                    await askQuestion("Enter the ID of the doctor you want to visit : ")
                );

                const selectedDoctor = doctorList.find(
                    data => data._id === doctorId
                );

                if(!selectedDoctor){
                    console.log("Invalid Doctor ID");
                    continue;
                }

                await appointments.insertOne({
                    patientId: userId,
                    appointmentDepartment: departmentList.find(
                        data => data._id === departmentId
                    ).name,
                    appointmentDoctor: selectedDoctor.name,
                    appointmentBooking: new Date()
                });

                console.log("Appointment booked");
            }

            else if(option == 2){

                const getId = Number(
                    await askQuestion("Enter your Token ID : ")
                );

                const patient = await patients.findOne({_id: getId});

                if(!patient){
                    console.log("Invalid ID");
                    continue;
                }

                const appointmentList = await appointments.find({
                    patientId: getId
                }).toArray();

                if(appointmentList.length == 0){
                    console.log("No appointments found");
                }
                else{
                    console.log("Your Appointments...");
                    for(let data of appointmentList){
                        console.log(
                            `Department : ${data.appointmentDepartment} | Doctor : ${data.appointmentDoctor} | Booking : ${data.appointmentBooking}`
                        );
                    }
                }
            }

            else if(option == 3){
                rl.close();
                console.log("Exiting...");
                    break;
            }
            else{
                console.log("Enter a valid Option...");
            }
        }
    }else{
        console.log(`Enter a valid option`)
    }
    

    rl.close();
}
await main();


    } 
    catch(error){
        console.log("connection failed...")

    }finally{
        client.close();
        console.log("connection closed...")
    }
    
}
connect();
