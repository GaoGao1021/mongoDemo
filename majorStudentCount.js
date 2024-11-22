const fs = require('fs');
const csv = require('csv-parser');

// 讀取 CSV 檔案並統計各科系學生人數
const majorCounts = {};

fs.createReadStream('studentslist.csv') // CSV 檔案路徑
    .pipe(csv())
    .on('data', (data) => {
        const major = data['院系'];  // 根據欄位名稱取得科系資料
        if (major) {
            majorCounts[major] = (majorCounts[major] || 0) + 1;  // 累加科系學生數
        }
    })
    .on('end', () => {
        console.log("各科系學生人數統計：");
        for (const major in majorCounts) {
            console.log(`科系: ${major}, 人數: ${majorCounts[major]}`);
        }
    });
