/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

const useInitialEffect = (callback, ...dependencies) => {
	useEffect(() => callback(), [])
	useEffect(() => callback(), [dependencies])
}

export default useInitialEffect
