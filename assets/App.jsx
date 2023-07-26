import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import Create from './components/Create'


export default function App() {

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Create />} />
				<Route path='*' element={<h1>THere is no such page</h1>} />
			</Routes>
		</Router>
	)
}
