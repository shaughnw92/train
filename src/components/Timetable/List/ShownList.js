import { Fragment, useEffect, useState } from 'react'
import {
	INITIAL_NEXT_IX,
	INITIAL_PREVIOUS_IX,
	PAGE_ONE_ONLY,
	PAGE_ONE_TWO,
	PAGE_TWO_TWO,
} from '../../../constants/display'
import handleDestinationName from '../../../handlers/destination/handleDestinationName'
import handleStatus from '../../../handlers/handleStatus'
import mapStore from '../../../helpers/store'
import useTime from '../../../hooks/useTime'
import parseDestinations from '../../../transformers/parseAnnouncements/parseDestinations'

const ShownList = () => {
	const [shownList, setShownList] = useState([])
	const [prevIx, setPrevIx] = useState(INITIAL_PREVIOUS_IX)
	const [nextIx, setNextIx] = useState(INITIAL_NEXT_IX)
	const [pageInfo, setPageInfo] = useState('')

	const currentTime = useTime()

	const _ = mapStore(['currentDirection', 'list'])

	useEffect(() => {
		const newShownList = _.list.filter((_, ix) => ix >= prevIx && ix < nextIx)
		setShownList(newShownList)
	}, [prevIx, _.list, nextIx])

	useEffect(() => {
		if (!_.list.length) return
		if (INITIAL_NEXT_IX >= _.list.length) return setPageInfo(PAGE_ONE_ONLY)
		setPageInfo(PAGE_ONE_TWO)

		const timer = setTimeout(() => {
			if (prevIx >= INITIAL_NEXT_IX) {
				setPrevIx(INITIAL_PREVIOUS_IX)
				setNextIx(INITIAL_NEXT_IX)
				setPageInfo(PAGE_ONE_TWO)
			} else {
				setPrevIx(prevIx => prevIx + INITIAL_NEXT_IX)
				setNextIx(nextIx => nextIx + INITIAL_NEXT_IX)
				setPageInfo(PAGE_TWO_TWO)
			}
		}, 5000)

		return () => clearTimeout(timer)
	}, [prevIx, _.list])

	return (
		<Fragment>
			{shownList.map(
				(
					{
						destinationName,
						originName,
						arrivals,
						departures,
						platform,
						subPlatform,
						status,
					},
					ix
				) => (
					<Fragment key={ix}>
						{ix >= INITIAL_NEXT_IX && (
							<div className='list__row'>
								<div className='list__column'>...continued</div>
							</div>
						)}
						<div className='list__row'>
							<div className='list__column'>
								{_.currentDirection === 'departures'
									? departures.aimedDeps
									: arrivals.aimedArrs}
							</div>{' '}
							<div className='list__column'>
								{platform}
								{subPlatform}
							</div>
							<div className='list__column list__column--expanded'>
								{_.currentDirection === 'departures'
									? handleDestinationName(parseDestinations(destinationName))
									: handleDestinationName(parseDestinations(originName))}
							</div>
							<div className='list__column'>
								{handleStatus(status, arrivals, departures, _.currentDirection)}
							</div>
						</div>
					</Fragment>
				)
			)}
			<div className='list__row'>
				{pageInfo && <div className='list__column--left'>{pageInfo}</div>}
				{currentTime && (
					<div className='list__column--right'>
						<h4>{currentTime}</h4>
					</div>
				)}
			</div>
		</Fragment>
	)
}
export default ShownList
