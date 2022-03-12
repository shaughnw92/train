import { matchingValue, matchingValueExists } from './matchingValue'
import {
	otherValues,
	otherValuesStartingWith,
	otherValuesStartWith,
} from './otherValues'

const sortStationList = value => {
	if (matchingValueExists(value)) {
		const newStationList = [matchingValue(value), ...otherValues(value)]
		const setStationList = [...new Set(newStationList)]
		return setStationList
	}

	if (otherValuesStartWith(value)) {
		const newStationList = [
			...otherValuesStartingWith(value),
			...otherValues(value),
		]
		const setStationList = [...new Set(newStationList)]
		return setStationList
	}

	return otherValues(value)
}

export default sortStationList
