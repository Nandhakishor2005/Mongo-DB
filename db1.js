const { MongoClient } = require("mongodb");

const url ="mongodb://localhost:27017";

const client = new MongoClient(url);

async function conn(){

    try{

        await client.connect();
        console.log("connection sucessfull...");

        const database = client.db("company");
        console.log("database created sucessfully...");

        const company = database.collection("employee")
        console.log("connection created sucessfully...")

        const store = await
    }
}

