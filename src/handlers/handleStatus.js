import handleJourneyType from './handleJourneyType'

const handleStatus = (status, arrivals, departures, direction) => {
	switch (status) {
		case 'EARLY':
		case 'BUS':
		case 'ON TIME':
			return 'On time'
		case 'CHANGE OF ORIGIN':
		case 'NO REPORT':
		case 'STARTS HERE':
		case 'LATE':
			return handleJourneyType(arrivals, departures, direction)
		case 'CANCELLED':
			return 'Cancelled'
		default:
			return ''
	}
}

export default handleStatus
