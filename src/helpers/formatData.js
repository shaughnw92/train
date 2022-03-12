import { A_TO_Z, ENDS_IN_A_TO_Z, STARTS_WITH_A_TO_Z } from '../constants/regex'
import parseCarriages from '../transformers/parseCarriages/parseCarriages'
import parseScotRail from '../transformers/parseOperators/parseScotRail'
import parseCaldervale from '../transformers/parseDestinations/parseCaldervale'
import parseHarrogate from '../transformers/parseDestinations/parseHarrogate'
import parseAbellio from '../transformers/parseOperators/parseAbellio'
import parseOpenAccessCarriages from '../transformers/parseCarriages/parseOpenAccessCarriages'
import parsePlatforms from '../transformers/parsePlatforms/parsePlatforms'
import {
	PLATFORM_ANNOUNCIATIONS,
	STATION_ANNOUNCIATIONS,
	SUB_PLATFORM_ANNOUNCIATIONS,
} from '../constants/voice'
import { ABBREVIATIONS } from '../constants/stations'
import { isRequestStation } from './isStation'
import { notFirstWord } from '../utils/findStrings'
import { findAbbreviationIx, findAnnounciationIx } from './find'
import { replaceAToZ } from './replace'

export const formatJourneys = (train, ix) => {
	train['arrivals'] = {
		aimedArrs: train.aimedArrivalTime,
		expectedArrs: train.expectedArrivalTime,
	}
	train['departures'] = {
		aimedDeps: train.aimedDepartureTime,
		expectedDeps: train.expectedDepartureTime,
	}
	train['position'] = ix + 1

	if (train.platform === null) train.platform = '-'

	parseScotRail(train)
	parseCaldervale(train)
	parseHarrogate(train)
	parseOpenAccessCarriages(train)
	parseCarriages(train)
	parseAbellio(train)
	parsePlatforms(train)

	delete train.aimedArrivalTime
	delete train.expectedArrivalTime
	delete train.aimedDepartureTime
	delete train.expectedDepartureTime

	return train
}

export const formatJourneyPlatforms = (train, _, arr) => {
	const subPlatformIx = arr.findIndex(train =>
		ENDS_IN_A_TO_Z.test(train.platform)
	)

	if (subPlatformIx !== -1) {
		if (!train.platform || typeof train.platform !== 'string') return train
		const subPlatform =
			typeof train.platform === 'string' && train.platform.match(ENDS_IN_A_TO_Z)
				? train.platform[train.platform.length - 1]
				: ''

		train['platform'] = STARTS_WITH_A_TO_Z.test(train.platform)
			? train.platform
			: replaceAToZ(train.platform)
		train['subPlatform'] = subPlatform
	}

	train['platform'] = `${train.platform}`
	train['subPlatform'] = ''

	return train
}

export const formatAnnouncements = (train, ix, arr) => {
	const {
		arrivals: { aimedArrs },
		departures: { aimedDeps },
	} = train
	if (!train.arrivals.aimedArrs && !train.departures.aimedDeps)
		return train.stationName

	const abbreviationExists = ABBREVIATIONS.some(abv =>
		notFirstWord(train.stationName).includes(abv.original)
	)
	const originalIx = findAbbreviationIx(train.stationName, 'original')

	if (abbreviationExists && train.stationName.length > 15) {
		train.stationName = train.stationName.replace(
			ABBREVIATIONS[originalIx].original,
			ABBREVIATIONS[originalIx].new || ''
		)
	}

	if (arr.length === 1)
		return `${train.stationName.replace(',', '')} only (${aimedArrs})`

	if (isRequestStation(arr[ix].stationName))
		train.stationName = `${train.stationName} (x)`

	return `${
		ix === arr.length - 1
			? `and ${train.stationName} (${aimedArrs})`
			: `${train.stationName} (${aimedDeps})`
	}`
}

export const formatVoice = (train, ix, arr) => {
	if (isRequestStation(train.stationName)) train['requestStop'] = true
	const stationAnnIx = findAnnounciationIx(
		STATION_ANNOUNCIATIONS,
		'original',
		train,
		'stationName'
	)
	const platformAnnIx = findAnnounciationIx(
		PLATFORM_ANNOUNCIATIONS,
		'original',
		train,
		'platform'
	)
	const subPlatformAnnIx = findAnnounciationIx(
		SUB_PLATFORM_ANNOUNCIATIONS,
		'original',
		train,
		'subPlatform'
	)

	if (platformAnnIx !== -1)
		arr[ix].platform = PLATFORM_ANNOUNCIATIONS[platformAnnIx].new

	if (subPlatformAnnIx !== -1)
		arr[ix].subPlatform = SUB_PLATFORM_ANNOUNCIATIONS[subPlatformAnnIx].new

	if (stationAnnIx !== -1)
		arr[ix].stationName = STATION_ANNOUNCIATIONS[stationAnnIx].new

	train['requestStop'] = false

	if (arr.length === 1 && !train.stationName.match('only')) {
		train.stationName = `${train.stationName}, only`
	}

	if (
		arr.length !== 1 &&
		ix === arr.length - 1 &&
		!train.stationName.match('&')
	) {
		train.stationName = `& ${train.stationName}`
	}

	return train.stationName
}

export const formatLongDestinationStops = (stop, ix, arr) => {
	if (ix !== arr.length - 1) stop = `${stop}, `
	return stop
}
