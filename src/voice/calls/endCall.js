import { BICYCLE_SPACES, FIRST_CLASS_AVAILABLE } from '../../constants/voice'
import isPlural from '../../utils/isPlural'
import { isGWRWestStation, isMajorStation } from '../../helpers/isStation'
import { firstClassDetails } from '../../helpers/find'

export const carriageCall = (carriages, currentStation, bus) => {
	if (
		!carriages ||
		carriages === null ||
		typeof carriages === 'undefined' ||
		bus
	)
		return ''
	const majorGWRWest =
		isMajorStation(currentStation) || isGWRWestStation(currentStation)
	const isFormedOf = isMajorStation(currentStation)
		? `is formed of ${carriages}`
		: `has ${carriages}`
	const pluralCapacity = majorGWRWest
		? isPlural(carriages, 'coach')
		: isPlural(carriages, 'carriage')
	return `This train ${isFormedOf} ${pluralCapacity}.`
}

export const bicycleSpaceCall = (currentStation, firstClass) =>
	isGWRWestStation(currentStation) && firstClass ? BICYCLE_SPACES : ''

export const firstClassCall = (
	currentStation,
	firstClass,
	bus,
	operator,
	destination,
	origin
) => {
	if (!isMajorStation(currentStation) || !firstClass || bus) return ''
	const locatedObj = firstClassDetails(destination, origin, operator)
	if (!locatedObj || locatedObj.length === 0) return FIRST_CLASS_AVAILABLE
	return `First class accommodation is ${locatedObj.proximity} the ${locatedObj.location} of the train`
}
