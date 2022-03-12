import { LONDON_NORTHWESTERN_RAILWAY } from '../../constants/misc'

const parseAbellio = train => {
	if (
		train.operatorName !== 'West Midlands Trains' ||
		!train.destinationName ||
		!train.originName
	)
		return

	if (
		!LONDON_NORTHWESTERN_RAILWAY.some(
			lnr =>
				train.destinationName.includes(lnr) || train.originName.includes(lnr)
		)
	) {
		train.operatorName = 'West Midlands Railway'
		return
	}

	train.operatorName = 'London Northwestern Railway'
}

export default parseAbellio
