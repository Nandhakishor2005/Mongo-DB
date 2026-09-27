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
