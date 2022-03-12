import List from '../components/Timetable/List/List'
import LongDestination from '../components/Timetable/LongDestination/LongDestination'
import Platform from '../components/Timetable/Platform/Platform'
import { sentenceToCamelCase } from '../utils/case'
import twoArraysToObject from '../utils/twoArraysToObject'

export const DISPLAY_VALUES = ['platform', 'long destination', 'list']
export const DISPLAY_KEYS = DISPLAY_VALUES.map(type =>
	sentenceToCamelCase(type)
)
export const DISPLAY_TYPES = twoArraysToObject(DISPLAY_KEYS, DISPLAY_VALUES)

export const JOURNEY_TYPE = ['departures', 'arrivals']

export const INITIAL_DISPLAY_TYPE = {
	selected: DISPLAY_VALUES[1],
}

export const DISPLAY_IX = {
	list: 20,
	longDestination: 1,
	platform: 3,
}

export const INITIAL_PREVIOUS_IX = 0
export const INITIAL_NEXT_IX = 10

export const PAGE_ONE_ONLY = 'page 1 of 1'
export const PAGE_ONE_TWO = 'page 1 of 2'
export const PAGE_TWO_TWO = 'page 2 of 2'

export const DEFAULT_DISPLAY = 'Nothing chosen'

export const COMPONENTS = {
	LongDestination: LongDestination,
	Platform: Platform,
	List: List,
}
