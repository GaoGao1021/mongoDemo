const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// MongoDB 連線設定
const uri = "mongodb://localhost:27017";
const dbName = "412637331";
const collectionName = "majorCounts";

// 儲存科系統計結果
const majorCounts = {};

(async () => {
    const client = new MongoClient(uri);

    try {
        // 連接到 MongoDB
        await client.connect();
        console.log("成功連接到 MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 讀取 CSV 檔案
        fs.createReadStream('studentslist.csv') // CSV 檔案路徑
            .pipe(csv())
            .on('data', (data) => {
                const major = data['院系']; // 假設 CSV 裡有 "院系" 這一欄
                if (major) {
                    majorCounts[major] = (majorCounts[major] || 0) + 1;
                }
            })
            .on('end', async () => {
                // 插入統計結果到 MongoDB，並記錄插入結果
                const insertResult = await collection.insertOne({ majorCounts });

                if (insertResult.acknowledged) {
                    console.log("各科系學生人數統計已插入 MongoDB：");
                    console.log(majorCounts);
                    console.log(`插入結果：成功插入資料`);
                } else {
                    console.log("插入資料失敗！");
                }

                // 關閉連接
                await client.close();
            });
    } catch (error) {
        console.error("發生錯誤：", error);
    }
})();
