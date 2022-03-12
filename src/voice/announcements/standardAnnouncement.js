import serviceToCall from '../calls/serviceToCall'
import {
	destinationStopCall,
	individualStopCall,
	requestStopCall,
} from '../calls/stopCall'
import platformCall, { repeatPlatformCall } from '../calls/platformCall'
import { carriageCall, firstClassCall } from '../calls/endCall'

const standardAnnouncement = ({
	platform,
	subPlatform,
	viaStops,
	aimedDeps,
	expectedDeps,
	operator,
	destination,
	origin,
	carriages,
	requestStops,
	stops,
	stopsArray,
	startsHere,
	firstClass,
	currentStation,
	bus,
}) =>
	`${platformCall(
		platform,
		subPlatform,
		startsHere,
		bus,
		currentStation
	)} ${serviceToCall(expectedDeps, aimedDeps, operator)} ${destinationStopCall(
		destination,
		viaStops
	)}. ${individualStopCall(stops, stopsArray)} ${carriageCall(
		carriages,
		currentStation,
		bus
	)} ${firstClassCall(
		currentStation,
		firstClass,
		bus,
		operator,
		destination,
		origin
	)} ${requestStopCall(currentStation, requestStops)} ${repeatPlatformCall(
		platform,
		subPlatform,
		stopsArray,
		operator,
		aimedDeps,
		bus,
		currentStation
	)}`

export default standardAnnouncement
