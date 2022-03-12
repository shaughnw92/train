import { NOW } from '../constants/moment'
import differenceBy from '../utils/differenceBy'
import timeToNumber from '../utils/timeToNumber'

export const trainIsLateBy = (data, time) =>
	data.some(
		(train, ix) =>
			ix === 0 &&
			differenceBy(
				timeToNumber(train.departures.aimedDeps),
				timeToNumber(train.departures.expectedDeps),
				time
			)
	)

export const allTrainsAreX = (data, status) =>
	data.every(train => train.status === status)

export const departureInNthMins = (data, diff) =>
	data.some(
		(train, ix) =>
			ix === 0 &&
			differenceBy(
				timeToNumber(train.departures.expectedDeps),
				timeToNumber(NOW),
				diff
			)
	)

export const trainIsLate = data =>
	data.some(
		(train, ix) =>
			ix === 0 &&
			timeToNumber(train.departures.aimedDeps) >
				timeToNumber(train.departures.expectedDeps)
	)
