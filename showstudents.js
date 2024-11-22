
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// MongoDB connection settings
const uri = "mongodb://localhost:27017";

const dbName = "412637331";

const collectionName = "studentslistdemo";

(async () => {

const client = new MongoClient(uri);
try {
    // 連接到 MongoDB
    await client.connect();
    console.log("成功連接到 MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const students = await collection.find().toArray();

    console.log("學生資料列表：");
    students.forEach(students => {
        console.log(students);
    });

} catch (error){
    console.log(students);
} finally {
    await client.close();
    console.log("已離開 MongoDB 連接");
}
})();

