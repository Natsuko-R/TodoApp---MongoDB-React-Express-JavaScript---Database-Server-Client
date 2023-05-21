const { Router } = require("express")
const { getAllTodos, addTodo, deleteTodo, updateTodo } = require("../controller/TodoControllers")

const router = Router()

router.get('/', getAllTodos)
router.post('/add', addTodo)
router.delete('/delete/:id', deleteTodo)
router.put('/update/:id', updateTodo) // 漏写一个斜杠！！找半天bug！！！！

module.exports = router