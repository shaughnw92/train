import { useState, useCallback, useEffect } from 'react'

const useTime = (time = new Date(), timeout = 1000) => {
	const [currentTime, setCurrentTime] = useState(time)
	const updateTime = useCallback(
		() => setCurrentTime(time),
		[setCurrentTime, time]
	)

	useEffect(() => {
		const interval = setInterval(updateTime, timeout)

		return () => clearInterval(interval)
	}, [updateTime, timeout])

	return currentTime.toLocaleTimeString()
}

export default useTime
