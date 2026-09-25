const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function conn(){
    try{
        await client.connect();
        console.log("connection sucessfull...");

        const database = client.db("group");
        console.log("database created sucessfully...");

        const cm = database.collection("customer")
        console.log("connection created sucessfully...")

//         const result = await cm.insertMany([
            
//     { _id: 1, customer: "John", product: "Laptop", amount: 1200, city: "NYC" },
//     { _id: 2, customer: "Sarah", product: "Phone", amount: 800, city: "LA" },
//     { _id: 3, customer: "John", product: "Mouse", amount: 25, city: "NYC" },
//     { _id: 4, customer: "Mike", product: "Laptop", amount: 1200, city: "LA" },
//     { _id: 5, customer: "Sarah", product: "Keyboard", amount: 50, city: "LA" },
//     { _id: 6, customer: "John", product: "Monitor", amount: 300, city: "NYC" }
// ])

    // let a = await cm.aggregate([
    //     {
    //         $group : {
    //             _id: "$customer",
    //             totalorders: {
    //                 $sum: 1
    //             }
    //         }
    //     }
    // ]).toArray();
    // console.log(a);

    //matchBeforegroup (WHERE)
    // let result = await cm.aggregate([
    //     { $match: {city:"NYC"}},
    //     {$group: {_id: "$customer" , totalspent:{ $sum: "$amount"}}}
    // ]).toArray();
    // console.log(result)

        // matchAftergroup (HAVING)

        let res =  await cm.aggregate([
            {
                $group: {_id : "$customer", totalspent: {$sum: "$amount"}},
                
            },
            //{$match: {totalspent: {$gt: 1000}}},
            {
                $sort: {totalspent: -1}
            },
            {
                
            }
            
        ]).toArray();
        console.log(res)

        

    }
    catch(error){
        console.log("connection failed...")

    }finally{
        client.close();
        console.log("connection closed...")
    }
}
conn();