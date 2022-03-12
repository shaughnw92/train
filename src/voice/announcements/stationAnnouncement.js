import { isMajorStation } from '../../helpers/isStation'

const stationAnnouncement = ({ currentStation }) =>
	isMajorStation(currentStation)
		? `${currentStation}? This is ${currentStation}`
		: ''

export default stationAnnouncement
