/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { capitalise } from '../../../utils/case'
import NoDepartures from '../NoDepartures'
import './list.scss'
import mapStore from '../../../helpers/store'
import arrayLength from '../../../utils/arrayLength'
import ShownList from './ShownList'

const List = () => {
	const _ = mapStore(['list', 'currentDirection', 'stationName', 'stationCode'])

	const hasNoDepartures = arrayLength([_.stationName, _.stationCode, _.list])

	return _.list.length > 0 ? (
		<div className='list'>
			<p>{capitalise(_.currentDirection)}</p>
			<div className='list__row list__row--head'>
				<div className='list__column'>Time</div>
				<div className='list__column'>Platform</div>
				<div className='list__column list__column--expanded'>Destination</div>
				<div className='list__column'>Exp.</div>
			</div>
			<ShownList />
		</div>
	) : (
		hasNoDepartures && <NoDepartures />
	)
}

export default List
