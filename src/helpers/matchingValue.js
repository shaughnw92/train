import { STATION_ENTRIES } from '../constants/stations'

export const matchingValueExists = value =>
	STATION_ENTRIES.some(([_, item]) =>
		item.match(value.toString().toUpperCase())
	)

export const matchingValue = value =>
	STATION_ENTRIES.find(([_, item]) =>
		item.match(value.toString().toUpperCase())
	)
