import React from 'react'
import { AiFillPlusSquare } from "react-icons/ai"

const Header = ({ newTodo, setNewTodo, handleAdd, isOnlyUndone, setIsOnlyUndone }) => {

    return (
        <div className='header-wrap' >
            <form className='form-wrap' onSubmit={handleAdd}>
                <input
                    className='input'
                    type="text"
                    placeholder="add a new todo..."
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                />
                {/* disabled属性：当（用户没有输入，输入框为空）时禁用该按钮 */}
                <button className='btn form-btn' type="submit" onClick={handleAdd} disabled={newTodo === ""} ><AiFillPlusSquare /></button>
            </form>

            <label className='show-undone-wrap'>
                <input
                    type="checkBox"
                    checked={isOnlyUndone}
                    onChange={e => setIsOnlyUndone(e.target.checked)}
                />
                {'\u00A0'} Only show undone todos
            </label>
        </div>
    )

}

export default Header