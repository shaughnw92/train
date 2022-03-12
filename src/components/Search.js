import React, { useEffect, useRef, useState } from 'react'
import { END_URL, START_URL } from '../constants/url'
import useOutsideClick from '../hooks/useOutsideClick'
import Tooltip from './Tooltip'
import timeToNumber from '../utils/timeToNumber'
import difference from '../utils/difference'
import { NOW } from '../constants/moment'
import mapStore from '../helpers/store'
import { LETTERS_SPACES } from '../constants/regex'
import usePreviousState from '../hooks/usePreviousState'

const Search = () => {
	const _ = mapStore([
		'input',
		'setInputChange',
		'departures',
		'setData',
		'setStationName',
		'link',
		'setLink',
		'setTooltip',
		'setPlatformList',
		'stationList',
		'setStationList',
		'stationCode',
		'setStationCode',
		'setPlatformNo',
		'resetPlatformNo',
	])

	const [latestStationCode, setLatestStationCode] = useState('')

	const ref = useOutsideClick(() => _.setTooltip(false))
	const inputRef = useRef()
	const prevLink = usePreviousState(_.link)

	const handleChange = e => {
		_.setInputChange(e)
		_.setStationList()
	}

	useEffect(() => {
		if (_.stationCode.length === 0) return
		_.setLink(START_URL + _.stationCode + END_URL)
	}, [_.setTooltip, _.stationCode, _.stationName, _.setLink, _.setData])

	useEffect(() => {
		if (_.link.length === 0 || prevLink === _.link) return

		_.setData()
		_.setTooltip(false)
		_.setPlatformList()
	}, [_.link, _.stationCode, prevLink])

	useEffect(() => {
		setLatestStationCode(_.stationCode)
		setTimeout(() => {
			const departureHasPassed = !_.departures.some(train =>
				difference(
					timeToNumber(train.departures.expectedDeps),
					timeToNumber(NOW),
					1
				)
			)
			if (departureHasPassed) return
			_.setLink(START_URL + latestStationCode + END_URL)
			_.setData()
		}, 120000)
	}, [_.setLink, _.setData, _.departures, _.stationCode, latestStationCode])

	useEffect(() => {
		if (!_.stationCode.length) return

		const interval = setInterval(() => window.location.reload(), 600000)
		return () => clearInterval(interval)
	}, [_.stationCode])

	useEffect(
		() =>
			_.stationCode.length > 0 &&
			document.addEventListener('visibilitychange', () =>
				window.location.reload()
			),
		[]
	)

	useEffect(() => {
		if (!_.departures.length) return
		_.setPlatformList()
		_.resetPlatformNo()
	}, [_.departures, _.setPlatformList, _.resetPlatformNo])

	const handleSubmit = e => {
		e.preventDefault()
		_.setStationCode(_.input)
		_.setStationName(_.input)
	}

	const handleKeyDown = e => {
		if (LETTERS_SPACES.test(e.key) || e.key !== 'Enter') return
		if (!LETTERS_SPACES.test(e.key)) _.setInputChange(e)
		if (e.key === 'Enter') handleSubmit(e)
	}

	const handleFocus = () => {
		if (_.input.length === 0) return

		_.setTooltip(false)
		inputRef.current.select()
	}

	return (
		<form ref={ref} onSubmit={handleSubmit}>
			<input
				onFocus={handleFocus}
				value={_.input}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				className='input'
			/>
			<button className='button active' type='submit'>
				{_.stationCode.length === 0 ? 'Search' : 'Change'}
			</button>
			{_.stationList.length > 0 && _.input.length > 0 && <Tooltip />}
			{_.stationList.length === 0 && _.input.length > 0 && (
				<p>
					There is no station under this name, please retype another station
				</p>
			)}
		</form>
	)
}

export default Search
