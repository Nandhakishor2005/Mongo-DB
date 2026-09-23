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

        // const result = await company.insertMany([
        //     {name : "Nandhakishor", age : 21, role : "developer", entrolled : true},
        //     {name : "Jithu Biju", age : 21, role : "engineer", entrolled : true},
        //     {name : "Prabin Pradeep", age : 21, role : "engineer", entrolled : true}
        // ]);

        // find 

        // const em = await collection.find().toArray();
        // console.log(em);

        // const emp= await company.find({ age: 21 }).toArray();
        // console.log(emp);

        // Find employee with role=developer
        // const e1 = await company.find({ role : "developer" }).toArray();
        // console.log(e1)

        // Find employee older than 20 AND role = engineer

        // const result = await company.find({$and: [{ age: { $gt: 20 } },{ role: "engineer" }]}).toArray();
        // console.log(result)

        // const result = await company.find({ age: { $gte: 18 } }).toArray();
        // console.log(result);

            // const result = await company.find({ age: { $lt: 25 } }).toArray();
            // console.log(result);

         // const result = await company.find({ age: { $lte: 21 } }).toArray();
        // console.log(result);

//         const result = await company.find({ role: { $ne: "developer" } }).toArray();
// console.log(result);

            // const result = await company.find({role: { $in: ["developer", "engineer"] }}).toArray();
            // console.log(result);

//                 const result = await company.find({role: { $nin: ["developer", "engineer"] }}).toArray();
// console.log(result);


// FIND

const result = await company.find().toArray();
console.log(result);


// COMPARISON OPERATORS

const result1 = await company.find({
    age: { $gt: 20 }
}).toArray();
console.log(result1);

const result2 = await company.find({
    age: { $gte: 21 }
}).toArray();
console.log(result2);

const result3 = await company.find({
    age: { $lt: 25 }
}).toArray();
console.log(result3);

const result4 = await company.find({
    age: { $lte: 21 }
}).toArray();
console.log(result4);

const result5 = await company.find({
    role: { $ne: "developer" }
}).toArray();
console.log(result5);

const result6 = await company.find({
    role: { $in: ["developer", "engineer"] }
}).toArray();
console.log(result6);

const result7 = await company.find({
    role: { $nin: ["developer", "engineer"] }
}).toArray();
console.log(result7);


// LOGICAL OPERATORS

const result8 = await company.find({
    $and: [
        { age: { $gt: 20 } },
        { role: "engineer" }
    ]
}).toArray();
console.log(result8);

const result9 = await company.find({
    $or: [
        { role: "developer" },
        { role: "engineer" }
    ]
}).toArray();
console.log(result9);

const result10 = await company.find({
    $nor: [
        { age: 21 },
        { age: 25 }
    ]
}).toArray();
console.log(result10);


// PROJECTION

const result11 = await company.find(
    {},
    {
        projection: {
            name: 1,
            age: 1,
            role: 1,
            _id: 0
        }
    }
).toArray();
console.log(result11);

const result12 = await company.find(
    {},
    {
        projection: {
            age: 0,
            role: 0
        }
    }
).toArray();
console.log(result12);


// SORTING

const result13 = await company.find()
    .sort({ age: 1 })
    .toArray();
console.log(result13);

const result14 = await company.find()
    .sort({ age: -1 })
    .toArray();
console.log(result14);


// LIMIT

const result15 = await company.find()
    .limit(5)
    .toArray();
console.log(result15);


// SKIP

const result16 = await company.find()
    .skip(2)
    .toArray();
console.log(result16);


// SKIP + LIMIT

const result17 = await company.find()
    .skip(2)
    .limit(3)
    .toArray();
console.log(result17);


// findOne()

const result18 = await company.findOne({
    name: "Nandhakishor"
});
console.log(result18);

const result19 = await company.findOne({
    role: "developer"
});
console.log(result19);


// findOne() WITH SORTING

const result20 = await company.findOne({})
    .sort({ age: 1 });
console.log(result20);


// updateOne()

const result21 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $set: {
            age: 22
        }
    }
);
console.log(result21);


// updateMany()

const result22 = await company.updateMany(
    { role: "engineer" },
    {
        $set: {
            entrolled: false
        }
    }
);
console.log(result22);


// upsert

const result23 = await company.updateOne(
    { name: "Rahul" },
    {
        $set: {
            name: "Rahul",
            age: 25,
            role: "developer",
            entrolled: true
        }
    },
    {
        upsert: true
    }
);
console.log(result23);


// $set

const result24 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $set: {
            age: 22
        }
    }
);
console.log(result24);


// $set MULTIPLE FIELDS

const result25 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $set: {
            age: 22,
            role: "Full Stack Developer",
            entrolled: true
        }
    }
);
console.log(result25);


// $unset

const result26 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $unset: {
            entrolled: ""
        }
    }
);
console.log(result26);


// $inc

const result27 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $inc: {
            age: 1
        }
    }
);
console.log(result27);


// $inc DECREASE

const result28 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $inc: {
            age: -1
        }
    }
);
console.log(result28);


// $mul

const result29 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $mul: {
            age: 2
        }
    }
);
console.log(result29);


// $min

const result30 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $min: {
            age: 20
        }
    }
);
console.log(result30);


// $max

const result31 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $max: {
            age: 25
        }
    }
);
console.log(result31);


// $rename

const result32 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $rename: {
            role: "jobRole"
        }
    }
);
console.log(result32);


// $push

const result33 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $push: {
            hobbies: "football"
        }
    }
);
console.log(result33);


// $push + $each

const result34 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $push: {
            hobbies: {
                $each: ["reading", "gaming"]
            }
        }
    }
);
console.log(result34);


// $addToSet

const result35 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $addToSet: {
            hobbies: "coding"
        }
    }
);
console.log(result35);


// $pop LAST

const result36 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $pop: {
            hobbies: 1
        }
    }
);
console.log(result36);


// $pop FIRST

const result37 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $pop: {
            hobbies: -1
        }
    }
);
console.log(result37);


// $pull

const result38 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $pull: {
            hobbies: "gaming"
        }
    }
);
console.log(result38);


// $pullAll

const result39 = await company.updateOne(
    { name: "Nandhakishor" },
    {
        $pullAll: {
            hobbies: ["gaming", "football"]
        }
    }
);
console.log(result39);


// deleteOne()

const result40 = await company.deleteOne({
    name: "Nandhakishor"
});
console.log(result40);


// deleteMany()

const result41 = await company.deleteMany({
    role: "engineer"
});
console.log(result41);


// DELETE ALL

const result42 = await company.deleteMany({});
console.log(result42);


// findOneAndDelete()

const result43 = await company.findOneAndDelete({
    name: "Nandhakishor"
});
console.log(result43);


    }
    catch(error){
        console.log("connection failed...")

    }finally{
        client.close();
        console.log("connection closed...")
    }
}
conn();

