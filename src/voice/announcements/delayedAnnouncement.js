import {
	delayApologyCall,
	delayReasonCall,
	delayInitialCall,
	delayTypeCall,
} from '../calls/delayCall'
import serviceToCall from '../calls/serviceToCall'
import { destinationStopCall } from '../calls/stopCall'

const delayedAnnouncement = ({
	currentStation,
	expectedDeps,
	viaStops,
	platform,
	subPlatform,
	aimedDeps,
	operator,
	cancelled,
	destination,
}) =>
	`${delayInitialCall(
		aimedDeps,
		expectedDeps,
		operator,
		currentStation,
		platform,
		subPlatform,
		cancelled
	)} ${serviceToCall(expectedDeps, aimedDeps, operator)}${destinationStopCall(
		destination,
		viaStops
	)} ${delayTypeCall(cancelled)} ${delayReasonCall(
		expectedDeps,
		aimedDeps,
		cancelled
	)} ${delayApologyCall(currentStation, operator, cancelled)}`

export default delayedAnnouncement
