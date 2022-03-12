/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from 'react'
import { DOUBLE_FALSE } from '../../../constants/misc'
import handleDestinationAndVia from '../../../handlers/destination/handleDestinationAndVia'
import handleDestinationName from '../../../handlers/destination/handleDestinationName'
import handleDepartureOrder from '../../../handlers/handleDepartureOrder'
import handleStatus from '../../../handlers/handleStatus'
import mapStore from '../../../helpers/store'
import usePreviousState from '../../../hooks/usePreviousState'
import parseDestinations from '../../../transformers/parseAnnouncements/parseDestinations'
import isPlural from '../../../utils/isPlural'
import { toggleIfLength, toggleIfValue } from '../../../utils/toggle'
import Announcements from './Announcements'

const ShownPlatforms = ({ onPause, onResume }) => {
	const _ = mapStore([
		'platform',
		'firstPlatformVia',
		'setFirstPlatformVia',
		'secondPlatformVia',
		'setSecondPlatformVia',
		'thirdPlatformVia',
		'setThirdPlatformVia',
		'platformList',
		'currentDirection',
		'currentPlatformNo',
		'stationName',
	])

	const [shownPlatforms, setShownPlatforms] = useState([])
	const [hiddenIx, setHiddenIx] = useState(2)
	const [showVia, setShowVia] = useState(DOUBLE_FALSE)
	const [shownCarriages, setShownCarriages] = useState(DOUBLE_FALSE)
	const [filteredViaStops, setFilteredViaStops] = useState([])

	const hasNoVias =
		_.firstPlatformVia === '_' &&
		_.secondPlatformVia === '_' &&
		_.thirdPlatformVia === '_'

	const hasNullCarriages = _.platform.every(
		({ carriages }) => carriages === null
	)

	useEffect(() => {
		if (hasNoVias) return

		if (hiddenIx === 2) {
			const newViaStops = [_.firstPlatformVia, _.secondPlatformVia]
			setFilteredViaStops(newViaStops)
		} else {
			const newViaStops = [_.firstPlatformVia, _.thirdPlatformVia]
			setFilteredViaStops(newViaStops)
		}
	}, [hiddenIx, _.firstPlatformVia, _.secondPlatformVia, _.thirdPlatformVia])

	useEffect(() => {
		if (_.platform.length < 3) return

		const timeout = setTimeout(
			() => setHiddenIx(prevHidden => (prevHidden === 2 ? 1 : 2)),
			8000
		)

		return () => clearTimeout(timeout)
	}, [hiddenIx])

	useEffect(() => {
		if (hasNoVias) return
		const timeout = setTimeout(() => {
			const newShowVia = [
				toggleIfLength(filteredViaStops, showVia, 0),
				toggleIfLength(filteredViaStops, showVia, 1),
			]
			setShowVia(newShowVia)
		}, 2000)

		return () => clearTimeout(timeout)
	}, [hiddenIx, showVia, filteredViaStops, _.currentPlatformNo])

	useEffect(() => {
		if (hasNullCarriages) return setShownCarriages(DOUBLE_FALSE)
		const timeout = setTimeout(() => {
			const newShownCarriages = [
				toggleIfValue(shownPlatforms, shownCarriages, 0),
				toggleIfValue(shownPlatforms, shownCarriages, 1),
			]
			setShownCarriages(newShownCarriages)
		}, 2000)

		return () => clearTimeout(timeout)
	}, [
		hiddenIx,
		shownPlatforms,
		shownCarriages,
		_.stationName,
		_.currentPlatformNo,
	])

	useEffect(() => {
		const newShownPlatform = _.platform.filter((_, ix) => ix !== hiddenIx)
		setShownPlatforms(newShownPlatform)
	}, [hiddenIx, _.platform])

	useEffect(() => {
		setShownPlatforms([])
		const newShownPlatform = _.platform.filter((_, ix) => ix !== hiddenIx)
		setShownPlatforms(newShownPlatform)
	}, [_.currentPlatformNo, _.stationName])

	return (
		shownPlatforms.length > 0 &&
		shownPlatforms.map(
			(
				{
					destinationName,
					arrivals,
					departures,
					operatorName,
					status,
					position,
					subPlatform,
					platform,
					carriages,
				},
				ix
			) => (
				<Fragment key={ix}>
					{ix === 0 && (
						<div className='platform__row platform__row--number'>
							<div className='platform__column platform__column--middle platform__column--number'>
								{(_.platformList.length > 1 || platform !== '-') &&
									`Platform ${platform}
              ${subPlatform}`}
							</div>
						</div>
					)}
					<div className='platform__row'>
						<div className='platform__column'>
							{handleDepartureOrder(position)}
						</div>
						<div className='platform__column'>{departures.aimedDeps}</div>
						<div className='platform__column'>
							{filteredViaStops[ix] !== '_'
								? handleDestinationAndVia(
										parseDestinations(destinationName),
										parseDestinations(filteredViaStops[ix]),
										showVia[ix]
								  )
								: handleDestinationName(parseDestinations(destinationName))}
						</div>
						<div className='platform__column platform__column--right'>
							{!shownCarriages[ix]
								? handleStatus(status, arrivals, departures, _.currentDirection)
								: `${carriages} ${isPlural(carriages, 'carriage')}`}
						</div>
					</div>
					{ix === 0 && (
						<Announcements
							onPause={onPause}
							onResume={onResume}
							operatorName={operatorName}
							carriages={carriages}
						/>
					)}
				</Fragment>
			)
		)
	)
}

export default ShownPlatforms
