// model用于管理MongoDB文档对象
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        default: "输入的todo无效",
        require: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('todo', todoSchema)// 第一个参数：数据库中的collection的名字