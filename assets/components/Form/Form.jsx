import React, { useContext } from 'react'
import { CreateContext } from '../Create'
import { useForm } from 'react-hook-form'

export default function Form() {
	const { register, handleSubmit } = useForm()
	const { value, setValue, submitHandler, setDificulty } = useContext(CreateContext)

	return (
		<form action="" className='header__form' onSubmit={submitHandler}>
			<input placeholder='Add A New Task...' value={value} onChange={(e) => setValue(e.target.value)} type="text" className='header__input' />
			<div className="header__input-box">
				<label htmlFor="hard" className='header__input-radio'>
					Hard
					<input type="radio" id='hard' name='dificulty' onChange={() => setDificulty(2)} />
				</label>
				<label htmlFor="medium" className='header__input-radio'>
					Medium
					<input type="radio" id='medium' name='dificulty' onChange={() => setDificulty(1)} />
				</label>
				<label htmlFor="easy" className='header__input-radio'>
					Easy
					<input type="radio" defaultChecked id='easy' name='dificulty' onChange={() => setDificulty(0)} />
				</label>
			</div>

			<div className="header__button-box">
				<button className={`header__button ${value == '' ? 'disabled' : ''}`} type='submit' >
					Create
				</button>
				<button className={`header__button ${value == '' ? 'disabled' : ''}`} type='button' onClick={() => setValue('')}>Cancel</button>
			</div>
		</form>
	)
}
