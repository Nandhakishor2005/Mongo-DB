const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

async function conn(){

    try{

        await client.connect();
        console.log("connection sucessfull...")

        const database = client.db("college");
        console.log("database created sucessfully...")

        const students = database.collection("students");
        console.log("connection created sucessfully...")

        // const result = await students.insertOne({name : "nandhakishor", age : 21});
        // console.log(result.insertedId);

        const result = await students.insertMany([
            {name : "Nandhakishor", age : 21, grade : "A", entrolled : true},
            {name : "Jithu Biju", age : 21, grade : "A+", entrolled : true},
            {name : "Prabin Pradeep", age : 21, grade : "A+", entrolled : true}
        ]);
        console.log(result.insertedCount);
        console.log(result.insertedIds);



    }catch(error){
        console.log("connection failed...")

    }finally{
        client.close();
        console.log("connection closed...")
    }
}
conn();
