import React, { useState, useEffect } from 'react'
import Block from './Block'

const BreedList = () => {
	const [ breeds, setBreeds ] = useState({})
	const [ hasError, setHasError ] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://dog.ceo/api/breeds/list/all')
				const json = await response.json()
				const breeds = Object.keys(json.message)
				const groupedBreed = {}
				for (let i = 0; i < breeds.length; i++) {
					const key = breeds[i].charAt(0)
					groupedBreed[key] = (groupedBreed[key] || []).concat(breeds[i])
				}
				setBreeds(groupedBreed)
			} catch (error) {
				setHasError(error)
			}
		}
		fetchData()
	}, [])
	const { type } = 'link'
	return (
		<div>
			<div>
				{Object.keys(breeds).map((key) => <Block key={key} items={breeds[key]} title={key} type={type} />)}
			</div>
		</div>
	)
}

export default BreedList
