/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { COMPONENTS } from '../../constants/display'
import mapStore from '../../helpers/store'
import { sentenceToUpperCamelCase } from '../../utils/case'

const Render = () => {
	const _ = mapStore([
		'departures',
		'currentDisplayType',
		'currentPlatformNo',
		'stationName',
		'setPlatform',
		'setLongDestination',
		'setList',
	])
	const ComponentName =
		COMPONENTS[sentenceToUpperCamelCase(_.currentDisplayType)]

	useEffect(() => {
		_.setList()
		_.setLongDestination()
		_.setPlatform()
	}, [_.setList, _.setLongDestination, _.setPlatform, _.departures])

	useEffect(() => {
		if (
			_.currentDisplayType !== 'long destination' &&
			_.currentPlatformNo !== 'all'
		)
			return
		_.setLongDestination()
	}, [
		_.currentDisplayType,
		_.currentPlatformNo,
		_.setLongDestination,
		_.stationName,
	])

	useEffect(() => {
		if (_.currentDisplayType !== 'platform' && _.currentPlatformNo !== 'all')
			return
		_.setPlatform()
	}, [_.currentDisplayType, _.currentPlatformNo, _.setPlatform, _.stationName])

	return <ComponentName />
}

export default Render
