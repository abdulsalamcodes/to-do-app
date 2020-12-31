import React, {useContext} from 'react'
import { TodoContext } from '../../../contexts/TodoContext'
import styles from './TodoTabs.module.css'

function TodoTabs() {
    const {getActive, getCompleted, getAll, tab} = useContext(TodoContext);
    return (
        <ul className={styles.TabList}>
            <li onClick={getAll}  ><button className={`${styles.TabBtn}  ${tab.all ?  styles.Active : ''}`}>All</button></li>
            <li onClick={getActive} ><button className={`${styles.TabBtn}  ${tab.active ?  styles.Active : ''}`}>Active</button></li>
            <li onClick={getCompleted} ><button className={`${styles.TabBtn}  ${tab.completed ?  styles.Active : ''}`}>Completed</button></li>
        </ul>
    )
}

export default TodoTabs
