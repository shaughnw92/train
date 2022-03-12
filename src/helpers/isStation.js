import {
	GWR_WEST_STATIONS,
	MAJOR_STATIONS,
	REQUEST_STATIONS,
	STATION_VALUES,
	WELSH_STATIONS,
} from '../constants/stations'

export const isMajorStation = currentStation =>
	MAJOR_STATIONS.includes(currentStation)

export const isWelshStation = currentStation =>
	WELSH_STATIONS.includes(currentStation)

export const isGWRWestStation = currentStation =>
	GWR_WEST_STATIONS.includes(currentStation)

export const isAirportStation = currentStation =>
	currentStation.endsWith("Int'l") || currentStation.endsWith('Airport')

export const isRequestStation = currentStation =>
	REQUEST_STATIONS.includes(currentStation)

export const isValidStation = currentStation =>
	STATION_VALUES.some(station => station.match(currentStation))

export const isStationOperator = (currentStation, array) =>
	array.find(station => station.includes(currentStation))
