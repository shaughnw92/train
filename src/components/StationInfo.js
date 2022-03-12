import React, { useState } from 'react'
import { isMajorStation } from '../helpers/isStation'
import mapStore from '../helpers/store'
import { capitalise, sentenceToKebabCase } from '../utils/case'
import classnames from 'classnames'
import './station-info.scss'
import handleStationOperator from '../handlers/handleStationOperator'

const StationInfo = () => {
	const _ = mapStore(['stationName', 'stationCode', 'platformList'])

	const [hasHover, setHasHover] = useState(false)
	const kebabCaseOperator = sentenceToKebabCase(
		handleStationOperator(_.stationName)
	)

	const getClassNames = element =>
		classnames(
			`station__${element}`,
			`station__${element}--${kebabCaseOperator}`
		)

	return (
		<div
			className={getClassNames('container')}
			onMouseEnter={() => setHasHover(true)}
			onMouseLeave={() => setHasHover(false)}
		>
			{hasHover ? (
				<p className={getClassNames('info')}>
					<strong>Station Code:</strong> {_.stationCode}
					<br />
					<strong>Number of platforms:</strong> {_.platformList.length - 1}
					<br />
					<strong>Major station:</strong>{' '}
					{isMajorStation(_.stationName) ? 'Yes' : 'No'}
					<br />
					<strong>Managed by:</strong> {handleStationOperator(_.stationName)}
				</p>
			) : (
				<h3 className={getClassNames('title')}>{capitalise(_.stationName)}</h3>
			)}
		</div>
	)
}

export default StationInfo
