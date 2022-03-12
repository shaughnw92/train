import React, { Fragment } from 'react'
import objectIsEmpty from '../utils/objectIsEmpty'
import Radio from './Radio'
import Search from './Search'
import './style.scss'
import Render from './Timetable/Render'
import mapStore from '../helpers/store'
import StationInfo from './StationInfo'

const Home = () => {
	const _ = mapStore([
		'data',
		'displayType',
		'currentDisplayType',
		'setDisplayType',
		'direction',
		'currentDirection',
		'setDirection',
		'platformList',
		'currentPlatformNo',
		'setPlatformNo',
		'departures',
	])

	return (
		<div className='container'>
			<Search />
			{!objectIsEmpty(_.data) && <StationInfo />}
			{!objectIsEmpty(_.data) && (
				<Fragment>
					<Radio
						state={_.displayType}
						currentState={_.currentDisplayType}
						setCurrentState={e => _.setDisplayType(e)}
					/>
					{_.currentDisplayType === 'list' ? (
						<Radio
							state={_.direction}
							currentState={_.currentDirection}
							setCurrentState={e => _.setDirection(e)}
						/>
					) : (
						_.platformList.length > 2 && (
							<Radio
								className='platform__button'
								state={_.platformList}
								currentState={_.currentPlatformNo}
								setCurrentState={e => _.setPlatformNo(e)}
							/>
						)
					)}
				</Fragment>
			)}
			{_.departures.length > 0 && <Render />}
		</div>
	)
}

export default Home
