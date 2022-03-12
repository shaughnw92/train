/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import isPlural from '../../../utils/isPlural'
import startsWithVowel from '../../../utils/startsWithVowel'
import mapStore from '../../../helpers/store'

const Announcements = ({ operatorName, carriages }) => {
	const _ = mapStore([
		'passengerAnnouncements',
		'currentPlatformNo',
		'platform',
		'setPlatform',
		'firstPlatformStop',
		'firstPlatformVia',
		'setFirstPlatformStop',
		'stationName',
	])

	return (
		_.passengerAnnouncements.length > 0 && (
			<div className='platform__row platform__row--scroll'>
				<div className='platform__column platform__column--scroll'>
					Calling at: {_.passengerAnnouncements}.{' '}
					{startsWithVowel(operatorName) ? 'An' : 'A'} {operatorName} service
					{carriages !== null &&
						` which has ${carriages} ${isPlural(carriages, 'carriage')}`}
					.
				</div>
			</div>
		)
	)
}

export default Announcements
