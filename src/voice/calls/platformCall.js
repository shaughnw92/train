import { GREATER_ANGLIA } from '../../constants/managed'
import { isStationOperator } from '../../helpers/isStation'
import serviceToCall from './serviceToCall'

const platformCall = (
	platform,
	subPlatform,
	startsHere = true,
	bus,
	currentStation
) => {
	const isGlasgowCentralHL =
		(platform !== 15 || platform !== 16) && currentStation === 'Glasgow Central'
	if (bus) return `The next bus to depart will be the`
	if (platform !== '-' && !startsHere)
		return `platform ${platform}${subPlatform} for the`
	if (platform !== '-' && isGlasgowCentralHL)
		return `The rear of platform ${platform}${subPlatform} for the`
	if (platform !== '-' && isStationOperator(currentStation, GREATER_ANGLIA))
		return `The train at platform ${platform}${subPlatform} is the`
	if (platform === '-' && !startsHere)
		return 'The next train to arrive, will be the'
	if (platform === '-' && startsHere)
		return 'The next train to depart, will be the'
	if (platform !== '-' && startsHere)
		return `The next train to depart from platform ${platform}${subPlatform}, will be the`
	return `will be the`
}

export const repeatPlatformCall = (
	platform,
	subPlatform,
	stopsArray,
	operator,
	expectedDep,
	aimedDep,
	bus,
	currentStation
) =>
	stopsArray.length === 15
		? `${platformCall(
				platform,
				subPlatform,
				false,
				bus,
				currentStation
		  )} ${serviceToCall(expectedDep, aimedDep, operator)}`
		: ''

export default platformCall
