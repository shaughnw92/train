import {
	SINGLE_PLATFORM_FALLBACKS,
	SPECIFIC_PLATFORM_FALLBACKS,
} from '../../constants/misc'

const parsePlatforms = train => {
	if (SINGLE_PLATFORM_FALLBACKS.includes(train.stationName)) {
		train.platform = '1'
		return
	}
	const stationNameExists = SPECIFIC_PLATFORM_FALLBACKS.hasOwnProperty(
		train.stationName
	)
	if (!stationNameExists) return

	const station = SPECIFIC_PLATFORM_FALLBACKS[train.stationName]

	const fallbackIx = station.findIndex(stop =>
		!stop.hasOwnProperty('originName')
			? stop.destinationName === train.destinationName
			: stop.destinationName === train.destinationName &&
			  stop.originName === train.originName
	)

	if (fallbackIx === -1 || !station[fallbackIx].platform) return
	train.platform = station[fallbackIx].platform
}

export default parsePlatforms
