import {
	ABBREVIATIONS,
	PRIMARY_VIA_STATIONS,
	SECONDARY_VIA_STATIONS,
} from '../constants/stations'
import { FIRST_CLASS_LOCATION, STATION_INFLECTIONS } from '../constants/voice'

export const findIx = (array, key, value) =>
	array.findIndex(item => item[key] && item[key].includes(value))

export const findViaStops = (array, key) => {
	const viaStopsIx = array.findIndex(
		(item, ix, arr) =>
			(ix !== arr.length - 1 && PRIMARY_VIA_STATIONS.includes(item[key])) ||
			(ix !== arr.length - 1 && SECONDARY_VIA_STATIONS.includes(item[key]))
	)
	if (viaStopsIx === -1 || !array[viaStopsIx].hasOwnProperty(key)) return ''
	return array[viaStopsIx][key]
}

export const findCurrentStationIx = (currentStation, stops, key) =>
	key || key.length > 0
		? stops.findIndex(stops => stops[key].includes(currentStation))
		: stops.findIndex(stops.includes(currentStation))

export const findAbbreviationIx = (stationName, key) =>
	ABBREVIATIONS.findIndex(abv => stationName.includes(abv[key]))

export const findAnnounciationIx = (array, key, data, property) =>
	array.findIndex(station => station[key].includes(data[property]))

export const propertyExists = (array, key, property) =>
	array.some(arr => property.includes(arr[key]))

export const containsStationInflection = destination =>
	STATION_INFLECTIONS.some(station => station.includes(destination))

export const firstClassDetails = (destination, origin, operator) => {
	const containsOperator = FIRST_CLASS_LOCATION.some(fc =>
		fc.operator.match(operator)
	)
	if (!containsOperator) return {}

	const locatedArray = FIRST_CLASS_LOCATION.find(fc =>
		fc.operator.includes(operator)
	).located

	const originContainsLondon = origin.includes('London')
	const destinationContainsLondon = destination.includes('London')

	const southboundIx = findIx(locatedArray, 'direction', 'Southbound')
	const northboundIx = findIx(locatedArray, 'direction', 'Northbound')

	if (destinationContainsLondon) return locatedArray[southboundIx]
	if (originContainsLondon) return locatedArray[northboundIx]
}
