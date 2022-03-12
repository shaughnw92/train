/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import classnames from 'classnames'
import mapStore from '../helpers/store'
import { END_URL, START_URL } from '../constants/url'
import { IN_BRACES, IN_BRACKETS } from '../constants/regex'
import { isValidStation } from '../helpers/isStation'

const Tooltip = () => {
	const _ = mapStore([
		'input',
		'setTooltipChange',
		'tooltip',
		'setTooltip',
		'setStationCode',
		'stationName',
		'setStationName',
		'stationList',
		'setLink',
		'setData',
	])

	const handleSetStation = e => {
		const targetStation = e.target.textContent
			.replace(IN_BRACKETS, '')
			.replace(IN_BRACES, '')
			.trim()
		if (!isValidStation(targetStation)) return
		_.setStationName(e)
		_.setStationCode(e)
	}

	const handleSetData = () => {
		if (_.input !== _.stationName) return
		_.setLink(START_URL + _.stationCode + END_URL)
		_.setData()
	}

	const handleClick = e => {
		_.setTooltipChange(e)
		handleSetStation(e)
		handleSetData()
		_.setTooltip(false)
	}

	useEffect(() => {
		if (_.stationList.length === 0 || _.input.length === 0) _.setTooltip(false)
		_.setTooltip(true)
	}, [_.stationList, _.setTooltip])

	return (
		_.tooltip && (
			<div className={`container__tooltip${_.tooltip ? '--visible' : ''}`}>
				<ul className='tooltip__ul' onClick={handleClick}>
					{_.stationList.map(([key, value], ix) => (
						<li
							className={classnames(
								'tooltip__li',
								key.length > 20 && 'tooltip__li--tight'
							)}
							key={ix}
						>
							{key} <span className='tooltip__span'>[{value}]</span>
						</li>
					))}
				</ul>
			</div>
		)
	)
}

export default Tooltip
