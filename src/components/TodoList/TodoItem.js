import React, { useContext } from 'react'
import { TodoContext } from '../../contexts/TodoContext';
import styles from './TodoList.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

function TodoItem(props) {
    const { dispatch, tab, showCompleted } = useContext(TodoContext);

    const handleClick = () => {
        dispatch({ type: 'remove', id: props.id });
        showCompleted();
    }

    return (
        <div className={styles.TodoItem} >
            <input type="checkbox" defaultChecked={props.active} onChange={() => dispatch({ type: 'completed', id: props.id })} />
            <span>{props.todo}</span>
            {tab.completed && <IconButton onClick={handleClick}>
                <DeleteIcon />
            </IconButton>}
        </div>
    )
}

export default TodoItem
