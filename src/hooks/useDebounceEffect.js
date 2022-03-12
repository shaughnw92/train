import { useEffect } from 'react'

const useDebounceEffect = (effect, delay, deps) => {
	useEffect(() => {
		const handler = setInterval(() => effect(), delay)
		return () => clearInterval(handler)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deps])
}

export default useDebounceEffect
