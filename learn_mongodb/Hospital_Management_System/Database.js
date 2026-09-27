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
        const userAge = await askQuestion("Please mention your age :");
        const userMob = await askQuestion("Enter your Phone Number :");

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
                console.log(" 3. Do you want to exit ?");
                let value =1;
                    while(value){

                const option = await askQuestion("Please select your Option :");

                if(option == 1){
                    userId = await askQuestion("Enter Your Token ID :");
                    console.log(userId);

                    console.log("Available Departments...");
                    const departmentList = await departments.find().toArray();
                            for(let data of departmentList){
                                console.log(`ID : ${data._id} | ${data.name}`);
                            }
                }
                else if(option == 2){
                    userId = await askQuestion("Enter Your Token ID :");
                    console.log(userId)
                }
                else if(option == 3){
                    value=0;
                    rl.close();
                    break;

                    
                }else{
                    console.log("Enter a valid Option...")
                }
                }




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
