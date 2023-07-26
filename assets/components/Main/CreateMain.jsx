import React, { useContext, useEffect, useState } from 'react'
import Todo from '../Todo'
import { CreateContext } from '../Create'
import { ACTIONS } from '../Create'


export default function CreateMain() {

	const { todos, dispatch } = useContext(CreateContext)
	const [typeOfSort, setTypeOfSort] = useState(0)

	const hasCompleted = (array) => {
		for (let i = 0; i < array.length; i++) {
			if (array[i].complete) {
				return true
			}
		}
		return false
	}


	useEffect(() => {

		if (todos.length < 2) {
			return
		}

		switch (typeOfSort) {
			case 0:
				return dispatch({ type: ACTIONS.LATEST, payload: { id: todos } })
			case 1:
				return dispatch({ type: ACTIONS.OLDEST, payload: { id: todos } })
			case 2:
				return dispatch({ type: ACTIONS.EASIEST, payload: { dificulty: todos } })
			case 3:
				return dispatch({ type: ACTIONS.HARDEST, payload: { dificulty: todos } })
			case 4:
				return dispatch({ type: ACTIONS.COMPLETE, payload: { complete: todos } })

		}


	}, [typeOfSort, todos.length])


	return (
		<main className='main'>
			<section className="todo">
				<div className="todo__container container">

					<div className="todo__button-box">

						<label htmlFor="latest" className='todo__sort-button'>
							Latest
							<input defaultChecked type="radio" id='latest' name='sort' onChange={() => setTypeOfSort(0)} />
						</label>
						<label htmlFor="oldest" className='todo__sort-button'>
							Oldest
							<input type="radio" id='oldest' name='sort' onChange={() => setTypeOfSort(1)} />
						</label>
						<label htmlFor="easiest" className='todo__sort-button'>
							Easiest
							<input type="radio" id='easiest' name='sort' onChange={() => setTypeOfSort(2)} />
						</label>
						<label htmlFor="hardest" className='todo__sort-button'>
							Hardest
							<input type="radio" id='hardest' name='sort' onChange={() => setTypeOfSort(3)} />
						</label>
						<label htmlFor="complete" className={`todo__sort-button ${!hasCompleted(todos) ? 'disabled' : ''}`}>
							Complete
							<input disabled={!hasCompleted(todos)} type="radio" id='complete' name='sort' onChange={() => setTypeOfSort(4)} />
						</label>
					</div>

					{todos.length !== 0 ? todos.map((todo) => {
						return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
					}) : <h2 className='todo__title'>Empty :D</h2>}
				</div>
			</section>
		</main>
	)
}
