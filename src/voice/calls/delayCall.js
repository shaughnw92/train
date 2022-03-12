import difference from '../../utils/difference'
import differenceBy from '../../utils/differenceBy'
import timeToNumber from '../../utils/timeToNumber'
import { isMajorStation } from '../../helpers/isStation'

export const delayInitialCall = (
	aimedDep,
	expectedDep,
	currentStation,
	platform,
	subPlatform,
	cancelled
) => {
	if (timeToNumber(aimedDep) < timeToNumber(expectedDep)) return
	const attentionPlease =
		cancelled &&
		!isMajorStation(currentStation) &&
		`May I have your attention please ${
			platform !== '-' ? `at, platform ${platform}${subPlatform}` : ''
		}`
	const apology =
		!isMajorStation(currentStation) && 'We are sorry to announce that'
	return `${attentionPlease} ${apology} the`
}

export const delayReasonCall = (expectedDeps, aimedDeps, cancelled) => {
	const expectedDepsTime = timeToNumber(expectedDeps)
	const aimedDepsTime = timeToNumber(aimedDeps)
	if (expectedDepsTime > aimedDepsTime || cancelled) return
	const overAnHour = difference(expectedDepsTime, aimedDepsTime, 100)
	const approximateDelay = differenceBy(expectedDepsTime, aimedDepsTime)
	const returnedString = overAnHour
		? 'Please listen for further announcements.'
		: `by approximately ${approximateDelay} minutes.`
	return returnedString
}

export const delayApologyCall = (currentStation, operator, cancelled) => {
	if (isMajorStation(currentStation)) return
	const delayOrCancelled = cancelled ? 'the cancelation' : 'this late running'
	return `${operator}, apologises for ${delayOrCancelled}, and the inconvienence this will causu.`
}

export const delayTypeCall = cancelled =>
	cancelled ? 'has been cancelled' : 'is delayed'
