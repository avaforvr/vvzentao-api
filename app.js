const express = require('express');
const mysql = require('mysql');
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'test'
});

// 初始化一个 express 程序
const app = express();

// 访问首页，返回 webSites 查询结果
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM websites';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        // 返回查询结果
        res.send(JSON.stringify(result));
    });
});

// 监听 3000 端口
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
