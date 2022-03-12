import { SIX_ONE_O_ONE_SIX } from '../../constants/voice'
import { isMajorStation } from '../../helpers/isStation'

const securityAnnouncement = ({ currentStation }) =>
	isMajorStation(currentStation) ? SIX_ONE_O_ONE_SIX : ''

export default securityAnnouncement
