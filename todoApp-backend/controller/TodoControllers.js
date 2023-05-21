const TodoModel = require('../model/TodoModel')

module.exports.getAllTodos = async (req, res) => {
    try {
        const todoList = await TodoModel.find()
        res.json(todoList)
    } catch (e) {
        console.log('读取todoList失败:', e)
    }
}

module.exports.addTodo = async (req, res) => {
    try {
        const newTodo = await new TodoModel({
            text: req.body.text,
            done: req.body.done
        }).save()

        res.json(newTodo)

    } catch (e) {
        console.log('添加失败:', e)
    }
}

module.exports.deleteTodo = async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id)
        res.json({ message: '删除成功' })
    } catch (e) {
        console.log('删除失败:', e)
    }
}

module.exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, { text: req.body.text, done: req.body.done })
        res.json(updatedTodo)
    } catch (e) {
        console.log('更新失败:', e)
    }
}