import axios from 'axios'

const getAllTodos = async (setTodoList) => {
    try {
        const res = await axios.get('/api');
        setTodoList(res.data);
    } catch (e) {
        console.error('读取失败:', e);
    }
}

const addTodo = async (newTodo) => {
    try {
        const res = await axios.post('/api/add', { text: newTodo });
        console.log('添加成功:', res.data);
    } catch (e) {
        console.error('添加失败:', e);
    }
}

const deleteTodo = async (id) => {
    try {
        await axios.delete(`/api/delete/${id}`);
        console.log('删除成功');
    } catch (e) {
        console.error('删除失败:', e);
    }
}

const editTodoText = async (id, updateText) => {
    try {
        const res = await axios.put(`/api/update/${id}`, { text: updateText })
        console.log('更新成功:', res.data)
    } catch (e) {
        console.error('更新失败:', e)
    }
}

const updateTodoDone = async (id, updateDone) => {
    try {
        const res = await axios.put(`/api/update/${id}`, { done: updateDone })
        console.log('更新成功:', res.data)
    } catch (e) {
        console.error('更新失败:', e)
    }
}

export { getAllTodos, addTodo, deleteTodo, editTodoText, updateTodoDone }