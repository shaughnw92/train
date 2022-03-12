import { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import handleDestinationName from '../../../handlers/destination/handleDestinationName'
import parseDestinations from '../../../transformers/parseAnnouncements/parseDestinations'
import handleVia from '../../../handlers/destination/handleVia'
import handleStatus from '../../../handlers/handleStatus'
import Announcements from './Announcements'
import mapStore from '../../../helpers/store'
import { formatLongDestinationStops } from '../../../helpers/formatData'
import joinEveryNth from '../../../utils/joinEveryNth'
import useTime from '../../../hooks/useTime'

const ShownLongDestination = () => {
	const [shownStops, setShownStops] = useState([])
	const [stopsList, setStopsList] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [pageLn, setPageLn] = useState(0)

	const currentTime = useTime()

	const _ = mapStore([
		'longDestination',
		'longDestinationVia',
		'currentDirection',
		'stationName',
		'passengerAnnouncements',
		'announcementsList',
	])

	useEffect(() => {
		const formattedAnnouncements = _.passengerAnnouncements
			.split(', ')
			.map(formatLongDestinationStops)
		const announcementsList = joinEveryNth(formattedAnnouncements, 10)
		setStopsList(
			prevStops => prevStops !== announcementsList && announcementsList
		)
		setPageLn(announcementsList.length)

		return () => setStopsList([])
	}, [_.passengerAnnouncements])

	useEffect(() => {
		if (_.longDestination.length === 0) return
		if (pageLn === 1) return setCurrentPage(1)
		const timer = setTimeout(
			() =>
				currentPage === pageLn
					? setCurrentPage(1)
					: setCurrentPage(currentPage + 1),
			5000
		)

		return () => clearTimeout(timer)
	}, [_.longDestination, pageLn, currentPage])

	useEffect(() => {
		if (pageLn === 1) {
			setShownStops(stopsList)
			return
		}
		const filteredStopsList = stopsList.filter(
			(_, ix) => ix === currentPage - 1
		)
		setShownStops(filteredStopsList)

		return () => setShownStops([])
	}, [stopsList, pageLn, currentPage])

	return _.longDestination.map(
		(
			{
				destinationName,
				arrivals,
				departures,
				operatorName,
				platform,
				subPlatform,
				status,
				carriages,
				mode,
			},
			ix
		) => (
			<Fragment key={ix}>
				<div className='long-destination__row'>
					<div className='long-destination__column long-destination__column--left'>
						<h2>{departures.aimedDeps}</h2>
					</div>
					<div className='long-destination__column long-destination__column--right'>
						<h2>
							Plat {platform}
							{subPlatform}
						</h2>
					</div>
				</div>
				<div className='long-destination__row'>
					<div className='long-destination__column long-destination__column--left'>
						<h3
							className={classnames(
								'long-destination__title',
								destinationName.length > 15 && 'tight'
							)}
						>
							{handleDestinationName(parseDestinations(destinationName))}
							{_.longDestinationVia !== '_' && (
								<p className='long-destination__via'>
									{handleVia(_.longDestinationVia)}
								</p>
							)}
						</h3>
					</div>
					<div className='long-destination__column long-destination__column--right'>
						<h3 className={classnames(destinationName.length > 20 && 'tight')}>
							{handleStatus(status, arrivals, departures, _.currentDirection)}
						</h3>
					</div>
				</div>
				<Announcements
					stopsList={shownStops}
					operatorName={operatorName}
					carriages={carriages}
					bus={mode === 'bus'}
				/>
				<div className='long-destination__row'>
					<div className='long-destination__column long-destination__column--left'>
						{pageLn !== 0 && (
							<p>
								Page {currentPage} of {pageLn}
							</p>
						)}
					</div>
					<div className='long-destination__column long-destination__column--right'>
						<h4>{currentTime}</h4>
					</div>
				</div>
			</Fragment>
		)
	)
}

export default ShownLongDestination
