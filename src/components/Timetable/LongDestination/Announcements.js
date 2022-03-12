import React, { Fragment } from 'react'
import { isMajorStation } from '../../../helpers/isStation'
import isPlural from '../../../utils/isPlural'
import mapStore from '../../../helpers/store'

const Announcements = ({ stopsList, operatorName, carriages, bus }) => {
	const _ = mapStore([
		'longDestination',
		'longDestinationStop',
		'longDestinationVia',
		'stationName',
	])

	return (
		<div className='long-destination__row long-destination__row--full'>
			<div className='long-destination__column long-destination__column--full'>
				{Array.isArray(stopsList) &&
					stopsList.map((stops, ix) => <Fragment key={ix}>{stops}</Fragment>)}
			</div>
			<div className='long-destination__row'>
				<div className='long-destination__column long-destination__column--full'>
					<p className='long-destination__spec'>
						{carriages !== null && (
							<Fragment>
								This train{' '}
								{isMajorStation(_.stationName)
									? `is formed of ${carriages} ${isPlural(carriages, 'coach')}`
									: `has ${carriages} ${isPlural(carriages, 'carriage')}`}
							</Fragment>
						)}
						{bus && 'Replacement bus service'}
						<br />A {operatorName} service
					</p>
				</div>
			</div>
		</div>
	)
}

export default Announcements
