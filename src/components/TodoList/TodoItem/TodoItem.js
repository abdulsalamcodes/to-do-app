import React, { useContext } from 'react'
import { TodoContext } from '../../../contexts/TodoContext';
import styles from './TodoItem.module.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function TodoItem(props) {
    const { dispatch, deleteItem, tab } = useContext(TodoContext);

    return (
        <div className={styles.TodoItem} >
            <input type="checkbox" id={props.todo} defaultChecked={props.active} onChange={() => dispatch({ type: 'completed', id: props.id })} />
            <label htmlFor={props.todo}>{props.todo}</label>

            <div className={styles.DeleteButton}>
                {tab.completed &&
                    <button className={styles.Button} onClick={() => deleteItem(props.id)}>
                        <DeleteOutlineIcon />
                    </button>
                }
            </div>
        </div>
    )
}

export default TodoItem
