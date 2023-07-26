import React from 'react'
import { ACTIONS } from './Create'

export default function Todo({ todo, dispatch }) {
	return (
		<div className="todo__item" style={{ borderRight: `2px solid ${todo.dificulty == 0 ? 'greenyellow' : todo.dificulty == 1 ? 'orange' : "red"}` }}>
			<div className="todo__text-box">
				<span className='todo__text' style={{ color: todo.complete ? '#999' : "#fff", textDecoration: todo.complete ? 'line-through' : "unset" }}>{todo.todo}</span>
				<span className='todo__text-time'>{todo.time}</span>
			</div>
			<div className="todo__buttons">
				<button className="todo__button" onClick={() => dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: todo.id } })}>Complete</button>
				<button className="todo__button" onClick={() => dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })}>Remove</button>
			</div>
		</div>
	)
}
