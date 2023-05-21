const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/TodoRoutes')
const port = 8080

mongoose
    .connect("mongodb://127.0.0.1:27017/todoList")
    .then(() => console.log('成功连接到MongoDB数据库'))
    .catch(e => console.error('连接MongoDB数据库失败:', e))

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`服务器已启动。端口号： ${port}`);
})


