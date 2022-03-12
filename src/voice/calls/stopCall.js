import { ARE_REQUEST_STOPS } from '../../constants/voice'
import { containsStationInflection } from '../../helpers/find'
import { isGWRWestStation } from '../../helpers/isStation'

export const individualStopCall = (stops, stopsArray) =>
	stopsArray.length > 0 ? `Calling at: ${stops}.` : ''

export const destinationStopCall = (destination, via) => {
	if (!containsStationInflection(destination) && (via === '_' || !via))
		return `${destination}.`
	if (containsStationInflection(destination) && (via === '_' || !via))
		return `${destination},`
	let viaStops
	if (containsStationInflection(via)) viaStops = ` via, ${via},`
	viaStops = ` via, ${via}.`
	return `${destination}, ${viaStops}`
}

export const requestStopCall = (currentStation, requestStops) =>
	requestStops.length > 0
		? `${requestStops} ${
				isGWRWestStation(currentStation)
					? ARE_REQUEST_STOPS.replace('alight', 'leave')
					: ARE_REQUEST_STOPS
		  }.`
		: ''
