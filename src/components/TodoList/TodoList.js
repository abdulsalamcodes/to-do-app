import React, { useContext } from 'react'
import InputForm from '../InputForm/InputForm'
import TodoItem from './TodoItem'
import TodoTabs from './TodoTabs'
import styles from './TodoList.module.css'
import { TodoContext } from '../../contexts/TodoContext'

function TodoList() {
    const { current, tab, dispatch, getActive } = useContext(TodoContext);

    return (
        <div>
            <TodoTabs />
            <InputForm />
            <ul className={styles.TodoList}>
               
                {current.length <= 0 ? <p className="text-center">NO ITEM AVAIBALBE.</p> : current.map(todo => {
                    return <TodoItem key={todo.id} id={todo.id} todo={todo.name} active={!todo.active} />
                })}


            </ul>
                <div className={styles.Button__wrapper}>
                {tab.completed && <button 
                disabled={current.length <= 0}
                onClick={() => dispatch({type: 'removeAllCompleted', redirect: getActive})} 
                className={styles.Button}>delete</button>}

                </div>
        </div>
    )
}

export default TodoList
