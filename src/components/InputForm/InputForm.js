import React, {useContext, useRef} from 'react'
import { TodoContext } from '../../contexts/TodoContext'
import styles from './InputForm.module.css'
function InputForm() {
    const { dispatch, tab} = useContext(TodoContext);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current.value.trim() === '') return;

        dispatch({type: 'add', name: inputRef.current.value });
        
        inputRef.current.value = '';
    }

    let content = '';

    if (!tab.completed) {
        content =  <form onSubmit={handleSubmit}>
        <div className={styles.FormWrapper}>
            <input className={styles.FormInput} placeholder="add details" type="text"  ref={inputRef} />
            <button type="submit" className={styles.FormBtn}>Add</button>
        </div>
    </form>
    } 

    return (
        content
    )
}

export default InputForm
