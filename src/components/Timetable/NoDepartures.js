import React from 'react'
import mapStore from '../../helpers/store'

const NoDepartures = () => {
	const { currentDirection } = mapStore(['currentDirection'])

	return <p>There are no {currentDirection}, please refer to timetables</p>
}

export default NoDepartures
