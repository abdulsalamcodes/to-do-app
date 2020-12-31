import React, { createContext, useState, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
export const TodoContext = createContext()


const initialValues = [
    {
        name: 'Do coding Challenge',
        active: true,
        timeAdded: new Date(),
        id: 1,
    },
    {
        name: 'Cook coding Challenge',
        active: false,
        timeAdded: new Date(),
        id: 2
    },
    {
        name: 'Do coding',
        active: false,
        timeAdded: new Date(),
        id: 3
    }
]

function reducer(lists, action) {

    switch (action.type) {
        case 'add':
            return [...lists, {
                name: action.name,
                active: true,
                timeAdded: new Date(),
                id: uuidv4()
            }];

        // Handle complete state. When the task is clicked or checked, this is called.
        case 'completed':
            return lists.map(todo => {
                if (todo.id === action.id) {
                    todo.active = !todo.active;
                }
                return todo
            })

      
        case 'removeAllCompleted':
            let completed = lists.filter(todo => todo.active);
            action.redirect()
            return completed;
        default:
            return lists
    }

}
// if there is any items store in the local storage, set that as the initial Value.
function getFromStorage() {
    const storedTodo = localStorage.getItem('todo-items');
    return storedTodo ? JSON.parse(storedTodo) : [];
}
// Active States of the Tabs.
const allTabs = { all: true, active: false, completed: false };

function TodoContextProvider(props) {
    // Monitor the Lists.
    const [lists, dispatch] = useReducer(reducer, initialValues, getFromStorage);

    // Set current set of list to show
    const [current, setCurrent] = useState(lists);

    // Monitor the tabs state
    const [tab, setTab] = useState(allTabs);

    useEffect(() => {
        // When the list has changed, update the items in the local storage and set the new states of the items in the list
        localStorage.setItem('todo-items', JSON.stringify(lists))
        setCurrent(lists)
    }, [lists])


    useEffect(() => {
        setCurrent(current)
    }, [current])


    const prevTabs = { ...allTabs };
    // When the "All" tab is clicked, get all elements
    const getAll = () => {
        setCurrent(lists.map(todo => todo));
        setTab({ prevTabs, all: true })
    }

 
    // When the "Active" tab is clicked, get all active elements
    const getActive = () => {
        setCurrent(lists.filter(todo => todo.active === true))
        setTab({ prevTabs, active: true })
    }

    // When the "Completed" tab is clicked, get all completed elements
    let completedItem = lists.filter(todo => todo.active !== true);
    const getCompleted = () => {
        setCurrent(completedItem);
        setTab({ prevTabs, completed: true })
    }
    
    // Delete a Completed Item.
    const deleteItem = (id) => {
        let itemToBeRemoved = lists.filter(todo => todo.id === id)[0];
        let itemIndex = lists.indexOf(itemToBeRemoved);
        lists.splice(itemIndex, 1);
        setCurrent(lists.filter(todo => todo.active !== true))
    }

    const showCompleted = () => {
        setCurrent(completedItem);
    }

    return (
        <TodoContext.Provider value={{ dispatch, getActive, tab, getCompleted, getAll, current, showCompleted, deleteItem }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider
