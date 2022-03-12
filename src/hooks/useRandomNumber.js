import { useEffect, useState } from 'react'

const useRandomNumber = (min = 0, max = 1, dependencies = []) => {
	const [depRandomNumber, setDepRandomNumber] = useState(0)
	const [randomNumber, setRandomNumber] = useState(0)

	useEffect(() => {
		const newDepRandomNumber = Math.floor(Math.random * (max - min + 1) + min)
		setDepRandomNumber(newDepRandomNumber)
	}, [dependencies, max, min])

	useEffect(() => {
		const newRandomNumber = Math.floor(Math.random() * (max - min + 1) + min)
		setRandomNumber(newRandomNumber)
	}, [])

	return dependencies.length ? depRandomNumber : randomNumber
}

export default useRandomNumber
