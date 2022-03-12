import {
	AVANTI_WEST_COAST,
	C2C,
	CHILTERN_RAILWAYS,
	EAST_MIDLANDS_RAILWAY,
	GREAT_WESTERN_RAILWAY,
	HEATHROW_EXPRESS,
	LNER,
	MERSEYRAIL,
	NORTHERN,
	SCOTRAIL,
	SOUTHEASTERN,
	SOUTH_WESTERN_RAILWAY,
	TFL_RAIL,
	THAMESLINK,
	TRANSPENNINE_EXPRESS,
	TRANSPORT_FOR_WALES,
	WEST_MIDLANDS_RAILWAY,
} from '../constants/managed'
import { LONDON_NORTHWESTERN_RAILWAY } from '../constants/misc'
import { isStationOperator } from '../helpers/isStation'

const handleStationOperator = currentStation => {
	const findStationOperator = operator =>
		isStationOperator(currentStation, operator)
	switch (currentStation) {
		case findStationOperator(AVANTI_WEST_COAST):
			return 'Avanti West Coast'
		case findStationOperator(C2C):
			return 'C2C'
		case findStationOperator(CHILTERN_RAILWAYS):
			return 'Chiltern Railways'
		case findStationOperator(EAST_MIDLANDS_RAILWAY):
			return 'East Midlands Railway'
		case findStationOperator(GREAT_WESTERN_RAILWAY):
			return 'Great Western Railway'
		case findStationOperator(HEATHROW_EXPRESS):
			return 'Heathrow Express'
		case findStationOperator(LNER):
			return 'LNER'
		case findStationOperator(LONDON_NORTHWESTERN_RAILWAY):
			return 'London Northwestern Railway'
		case findStationOperator(MERSEYRAIL):
			return 'Merseyrail'
		case findStationOperator(NORTHERN):
			return 'Northern'
		case findStationOperator(SCOTRAIL):
			return 'ScotRail'
		case findStationOperator(SOUTHEASTERN):
			return 'SouthEastern'
		case findStationOperator(SOUTH_WESTERN_RAILWAY):
			return 'South Western Railway'
		case findStationOperator(TFL_RAIL):
			return 'TfL Rail'
		case findStationOperator(THAMESLINK):
			return 'Thameslink'
		case findStationOperator(TRANSPENNINE_EXPRESS):
			return 'Transpennine Express'
		case findStationOperator(TRANSPORT_FOR_WALES):
			return 'Transport for Wales'
		case findStationOperator(WEST_MIDLANDS_RAILWAY):
			return 'West Midlands Railway'
		default:
			return 'Network Rail'
	}
}

export default handleStationOperator
