const express = require('express');
const mysql = require('mysql');
const port = 3000;

const pool = mysql.createPool({
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
    // 新建连接
    pool.getConnection(function(err, connection) {
        // 连接失败
        if (err) throw err;

        // 使用 connection 查询
        connection.query(sql, function (error, result) {
            // 连接使用结束后释放
            connection.release();
            // 释放连接后处理报错
            if (error) throw error;
            // 返回查询结果
            res.send(JSON.stringify(result));
            // 连接已经被释放掉，这里不能再使用connection了
        });
    });
});

// 监听 3000 端口
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
