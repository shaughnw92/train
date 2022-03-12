/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import '../../style.scss'
import './platform.scss'
import useTime from '../../../hooks/useTime'
import NoDepartures from '../NoDepartures'
import arrayLength from '../../../utils/arrayLength'
import ShownPlatforms from './ShownPlatforms'
import mapStore from '../../../helpers/store'

const Platform = () => {
	const _ = mapStore([
		'passengerAnnouncements',
		'setPassengerAnnouncements',
		'platform',
		'firstPlatformVia',
		'setFirstPlatformVia',
		'secondPlatformVia',
		'setSecondPlatformVia',
		'thirdPlatformVia',
		'setThirdPlatformVia',
		'firstPlatformStop',
		'secondPlatformStop',
		'thirdPlatformStop',
		'setFirstPlatformStop',
		'setSecondPlatformStop',
		'setThirdPlatformStop',
		'currentDirection',
		'stationCode',
		'stationName',
		'currentPlatformNo',
	])
	const currentTime = useTime()
	const hasNoDepartures = arrayLength([
		_.stationCode,
		_.stationName,
		_.passengerAnnouncements,
		_.platform,
	])

	useEffect(() => {
		if (!_.platform.length) return
		const firstUrl = _.platform[0].serviceTimetable.id
		_.setFirstPlatformStop(firstUrl)

		if (_.platform.length < 2) return
		const secondUrl = _.platform[1].serviceTimetable.id
		_.setSecondPlatformStop(secondUrl)

		if (_.platform.length < 3) return
		const thirdUrl = _.platform[2].serviceTimetable.id
		_.setThirdPlatformStop(thirdUrl)
	}, [
		_.platform,
		_.setFirstPlatformStop,
		_.setSecondPlatformStop,
		_.setThirdPlatformStop,
	])

	useEffect(() => {
		if (_.firstPlatformStop.length > 0) _.setFirstPlatformVia()
		if (_.secondPlatformStop.length > 0) _.setSecondPlatformVia()
		if (_.thirdPlatformStop.length > 0) _.setThirdPlatformVia()
	}, [
		_.currentPlatformNo,
		_.stationName,
		_.firstPlatformStop,
		_.secondPlatformStop,
		_.thirdPlatformStop,
	])

	useEffect(() => {
		if (!_.firstPlatformStop.length || !_.firstPlatformVia) return
		_.setPassengerAnnouncements(_.firstPlatformStop)
	}, [_.firstPlatformStop, _.setPassengerAnnouncements, _.firstPlatformVia])

	return _.platform.length > 0 && _.passengerAnnouncements.length > 0 ? (
		<div className='platform'>
			<ShownPlatforms />
			<div className='platform__row platform__row__middle'>
				<div className='platform__column platform__column--clock'>
					<h4>{currentTime}</h4>
				</div>
			</div>
		</div>
	) : (
		hasNoDepartures && <NoDepartures />
	)
}
export default Platform
