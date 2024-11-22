
const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";

const dbName = "412637331";

const collectionName = "studentslistdemo";

(async () => {

const client = new MongoClient(uri);
try {
    await client.connect();
    console.log("成功連接到 MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const results = [];
    fs.createReadStream('studentslist.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {

            const insertResult = await collection.insertMany(results);
            console.log(`成功插入 ${insertResult.insertedCount} 筆資料！`);

            await client.close();
        });
} catch (error) {
    console.error("發生錯誤：", error);
}})();
