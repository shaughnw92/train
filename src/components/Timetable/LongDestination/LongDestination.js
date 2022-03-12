import { useEffect } from 'react'
import './long-destination.scss'
import NoDepartures from '../NoDepartures'
import mapStore from '../../../helpers/store'
import ShownLongDestination from './ShownLongDestination'
import arrayLength from '../../../utils/arrayLength'

const LongDestination = () => {
	const _ = mapStore([
		'longDestination',
		'longDestinationStop',
		'setLongDestinationStop',
		'longDestinationVia',
		'setLongDestinationVia',
		'currentDirection',
		'stationCode',
		'stationName',
	])

	const hasNoDepartures = arrayLength([
		_.stationCode,
		_.stationName,
		_.longDestinationStop,
	])

	useEffect(() => {
		if (!_.longDestination.length) return
		const url = _.longDestination[0].serviceTimetable.id
		_.setLongDestinationStop(url)
	}, [_.longDestination, _.setLongDestinationStop])

	useEffect(() => {
		if (!_.longDestinationStop.length) return
		_.setLongDestinationVia(_.longDestinationStop)
	}, [_.longDestinationStop, _.setLongDestinationVia])

	return _.longDestination.length > 0 ? (
		<div className='long-destination'>
			<ShownLongDestination />
		</div>
	) : (
		hasNoDepartures && <NoDepartures />
	)
}

export default LongDestination
