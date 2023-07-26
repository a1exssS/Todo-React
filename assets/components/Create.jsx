import React, { useReducer, useState, useContext, createContext } from 'react'
import CreateMain from './main/CreateMain'
import Form from './Form/Form'

export const CreateContext = createContext()

export const ACTIONS = {
	ADD_TODO: 'add-todo',
	REMOVE_TODO: 'remove-todo',
	COMPLETE_TODO: 'complete-todo',
	DIFICULTY: 'dificulty',
	LATEST: 'lasets',
	OLDEST: 'oldest',
	EASIEST: 'easiest',
	HARDEST: 'hardest',
	COMPLETE: 'completed'
}

function reducer(todos, action) {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, newTodo(action.payload.todos, action.payload.dificulty)]
		case ACTIONS.COMPLETE_TODO:
			return todos.map((todo) => {
				if (todo.id == action.payload.id) {
					return { ...todo, complete: !todo.complete }
				}
				return todo
			})
		case ACTIONS.REMOVE_TODO:
			return todos.filter((todo) => todo.id !== action.payload.id)

		case ACTIONS.OLDEST:
			const oldestSort = (array) => {
				if (array.length < 2) {
					return array;
				}

				const pivot = array[0];
				let less = [];
				let greater = [];

				for (let i = 1; i < array.length; i += 1) {
					if (array[i].id <= pivot.id) {
						less.push(array[i]);
					} else {
						greater.push(array[i]);
					}
				}

				return oldestSort(less).concat(pivot, oldestSort(greater));
			}
			return oldestSort(action.payload.id)
		case ACTIONS.LATEST:
			const latestSort = (array) => {
				if (array.length < 2) {
					return array;
				}

				const pivot = array[0];
				let less = [];
				let greater = [];

				for (let i = 1; i < array.length; i += 1) {
					if (array[i].id >= pivot.id) {
						less.push(array[i]);
					} else {
						greater.push(array[i]);
					}
				}

				return latestSort(less).concat(pivot, latestSort(greater));
			}
			return latestSort(action.payload.id)

		case ACTIONS.EASIEST:
			const easySort = (array) => {
				if (array.length < 2) {
					return array;
				}

				const pivot = array[0];
				let less = [];
				let greater = [];

				for (let i = 1; i < array.length; i += 1) {
					if (array[i].dificulty < pivot.dificulty) {
						less.push(array[i]);
					} else {
						greater.push(array[i]);
					}
				}

				return easySort(less).concat(pivot, easySort(greater));
			}
			return easySort(action.payload.dificulty)
		case ACTIONS.HARDEST:
			const hardSort = (array) => {
				if (array.length < 2) {
					return array;
				}

				const pivot = array[0];
				let less = [];
				let greater = [];

				for (let i = 1; i < array.length; i += 1) {
					if (array[i].dificulty > pivot.dificulty) {
						less.push(array[i]);
					} else {
						greater.push(array[i]);
					}
				}

				return hardSort(less).concat(pivot, hardSort(greater));
			}
			return hardSort(action.payload.dificulty)
		case ACTIONS.COMPLETE:
			const completeSort = (array) => {
				if (array.length < 2) {
					return array;
				}

				const pivot = array[0];
				let less = [];
				let greater = [];

				for (let i = 1; i < array.length; i += 1) {
					if (!array[i].complete) {
						less.push(array[i]);
					} else {
						greater.push(array[i]);
					}
				}

				return completeSort(less).concat(pivot, completeSort(greater));
			}
			return completeSort(action.payload.complete)

		default: todos
	}
}


function newTodo(todos, dificulty) {
	const currentDate = new Date();
	return {
		id: Date.now(), todo: todos, complete: false, dificulty: dificulty, time: `${currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()}:${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()}:${currentDate.getSeconds() < 10 ? "0" + currentDate.getSeconds() : currentDate.getSeconds()} ${currentDate.getHours() > 12 ? "pm" : "am"}`, hasComplete: 0
	}
}

export default function Create() {

	const [value, setValue] = useState('')
	const [dificulty, setDificulty] = useState(0)
	const [todos, dispatch] = useReducer(reducer, [])


	const submitHandler = (e) => {
		e.preventDefault()
		dispatch({ type: ACTIONS.ADD_TODO, payload: { todos: value, dificulty: dificulty } })
		setValue('')
	}

	return (
		<>
			<CreateContext.Provider value={{ todos, dispatch, value, setValue, submitHandler, setDificulty }}>
				<header className='header'>
					<div className="header__container container">
						<h1 className='header__title'>Create Your Own Todo</h1>
						<Form />
					</div>
				</header>
				<CreateMain />
			</CreateContext.Provider>

		</>
	)
}
