import { IN_BRACKETS } from '../constants/regex'
import { STATION_ENTRIES } from '../constants/stations'
import toRegex from '../utils/toRegex'

export const otherValuesStartWith = value =>
	STATION_ENTRIES.some(([key, _]) => toRegex('^' + value, 'gi').test(key))

export const otherValuesStartingWith = value =>
	STATION_ENTRIES.filter(([key, _]) => toRegex('^' + value, 'gi').test(key))

export const otherValues = value =>
	STATION_ENTRIES.filter(([key, _]) =>
		toRegex(value, 'gi').test(key.replace(IN_BRACKETS, ''))
	)
