import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import { getAllTodos, addTodo, deleteTodo, editTodoText, updateTodoDone } from "./api/Apis";

const App = () => {
  const [todoList, setTodoList] = useState([]) // DataBase中的数据
  const [newTodo, setNewTodo] = useState("") // 新添加的todo
  const [updateTodoId, setUpdateTodoId] = useState("") // 被更新的todo的id
  const [updateTodoText, setUpdateTodoText] = useState("") // 被更新的todo的内容
  const [isOnlyUndone, setIsOnlyUndone] = useState(false) // 记录是否勾选：仅显示未完成

  // 监视todoList的状态，并及时更新DOM
  useEffect(() => {
    getAllTodos(setTodoList)
  }, [todoList]) // 不断发送get请求。死循环？

  // 添加
  const handleAdd = (e) => {
    e.preventDefault()
    addTodo(newTodo.trim())
    setNewTodo('') // 清空输入框
  }

  // 删除
  const handleDelete = (id) => {
    deleteTodo(id)
  }

  // 控制被编辑的todo的id和内容
  const handleEdit = (id, text) => {
    setUpdateTodoId(id)
    setUpdateTodoText(text)
  }

  // 更新某todo的文本
  const handleUpdateText = (e) => {
    e.preventDefault()

    // 修改的值不能为空。这里有个时隐时现的bug，点多了会反复弹出alert框死循环
    if (updateTodoText.trim() === "") {
      alert('修改不能为空')
      return
    }

    // 如果编辑内容与原todo内容相同，则不发送请求
    if (todoList.find(item => item._id === updateTodoId).text === updateTodoText) {
      setUpdateTodoId("")
      setUpdateTodoText("")
      return
    }

    editTodoText(updateTodoId, updateTodoText)

    setUpdateTodoId("")
    setUpdateTodoText("")
  }

  // 更新某todo的done状态
  const handleUpdateDone = (id, updateDone) => {
    updateTodoDone(id, updateDone)
    // 由于todoList被useEffect监视，所以状态会即刻更新
    // setTodoList(prev => {
    //   return prev.map(todo => {
    //     if (todo._id === id) {
    //       return { ...todo, done: updateDone }
    //     }
    //     return todo
    //   })
    // })
  }

  // 根据done状态获取两个不同的数组
  const undoneTodoList = todoList.filter(item => item.done === false)
  const doneTodoList = todoList.filter(item => item.done === true)

  return (
    // container = Header + Main + Footer
    <div className='container'>
      <Header
        handleAdd={handleAdd}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        isOnlyUndone={isOnlyUndone}
        setIsOnlyUndone={setIsOnlyUndone} />

      <div className='main-wrap'>

        {/* 上：没有todo时的提示语。下：完成全部todo时的提示语 */}
        {todoList.length === 0 && <div>What's your plan today ?</div>}
        {(doneTodoList.length !== 0 && doneTodoList.length === todoList.length) && <div>Congratulations ! You've finished all todos ! </div>}

        {
          // 遍历数组，显示todo
          // 根据是否勾选“仅显示未完成”，决定对哪个todoList进行遍历
          (isOnlyUndone ? undoneTodoList : todoList).map(item => (
            <TodoItem
              key={item._id}
              item={item}
              updateTodoId={updateTodoId}
              updateTodoText={updateTodoText}
              setUpdateTodoText={setUpdateTodoText}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleUpdateText={handleUpdateText}
              handleUpdateDone={handleUpdateDone} />
          ))
        }

      </div>

      <Footer
        doneTotal={doneTodoList.length}
        total={todoList.length} />
    </div>
  )
}

export default App;
