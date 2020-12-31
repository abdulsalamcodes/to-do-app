import React, { useContext } from 'react'
import InputForm from '../InputForm/InputForm'
import TodoItem from './TodoItem/TodoItem'
import TodoTabs from './TodoTab/TodoTabs'
import styles from './TodoList.module.css'
import { TodoContext } from '../../contexts/TodoContext';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function TodoList() {
    const { current, tab, dispatch, getActive } = useContext(TodoContext);
    let text = "";
    if (tab.completed) {
        text = "Completed"
    } else if (tab.active) {
        text = "Active"
    } else {
        text = "Remaining"
    }
    const tipText = `${current.length} ${current.length === 1 ? "task" : "tasks"} ${text}`;

    return (
        <div>
            <TodoTabs />
            <InputForm />
            {/* Hints */}
            <p className={styles.Tip__Note}>{tipText}</p>

            {/* List of Tasks */}
            <ul className={styles.TodoList}>
                {current.map(todo => {
                    return <TodoItem key={todo.id} id={todo.id} todo={todo.name} active={!todo.active} />
                })}
            </ul>

            <div className={styles.Button__wrapper}>
                {/* Display Delete button Only when the Completed Tab is Active */}
                {tab.completed && <button
                    disabled={current.length <= 0}
                    onClick={() => dispatch({ type: 'removeAllCompleted', redirect: getActive })}
                    className={styles.Button}><DeleteOutlineIcon /> Delete All</button>}

            </div>
        </div>
    )
}

export default TodoList
