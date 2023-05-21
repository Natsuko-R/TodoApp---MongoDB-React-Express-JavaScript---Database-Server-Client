import React, { useRef } from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

const TodoItem = ({ item, updateTodoId, updateTodoText, setUpdateTodoText, handleDelete, handleEdit, handleUpdateText, handleUpdateDone }) => {
    const updateInputRef = useRef(null) // input框内容自适应元素宽度 

    return (
        <div className='todo-item'>

            {/* nowrap类禁止子元素换行 */}
            <div className='nowrap'>
                <label>
                    <input type="checkBox" checked={item.done} onChange={e => handleUpdateDone(item._id, e.target.checked)} />
                    {'\u00A0'}{'\u00A0'}
                </label>

                {
                    updateTodoId === item._id // 根据id查找哪一个todo需要被更新
                        ? <input
                            type="text"
                            className='update-input'
                            value={updateTodoText}
                            onChange={e => setUpdateTodoText(e.target.value)}
                            autoFocus // 自动聚焦input
                            onBlur={handleUpdateText} // 失去焦点时提交表单
                            onKeyDown={e => {
                                // 根据指定按键提交表单
                                if (e.key === 'Enter' || e.key === 'Escape') {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleUpdateText(e)
                                }
                            }}
                            // 内容自适应input宽度，至少设置为1，避免UI太丑
                            ref={updateInputRef}
                            size={updateTodoText.length === 0 ? 1 : updateTodoText.length}
                        />
                        : item.text
                }
            </div>

            {/* 右侧的修改和删除按钮 */}
            <div className='btn-wrap'>
                <BiEdit className='btn' onClick={() => handleEdit(item._id, item.text)} />
                <AiFillDelete className='btn' onClick={() => { if (window.confirm('确认删除 ?')) handleDelete(item._id) }} />
            </div>

        </div>
    )
}

export default TodoItem