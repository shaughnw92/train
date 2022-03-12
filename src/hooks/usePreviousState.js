import { useRef, useEffect } from 'react'

const usePreviousState = state => {
	const ref = useRef()

	useEffect(() => {
		ref.current = state
	}, [state])

	return ref.current
}

export default usePreviousState
