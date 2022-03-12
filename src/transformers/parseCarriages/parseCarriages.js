import { CARRIAGES } from '../../constants/misc'

const parseCarriages = train => {
	if (!train.originName || !train.destinationName) {
		train['carriages'] = null
		return
	}

	const carriageObj = CARRIAGES.find(
		carriage =>
			(train.originName.includes(carriage.from) &&
				train.destinationName.includes(carriage.to)) ||
			(train.originName.includes(carriage.to) &&
				train.destinationName.includes(carriage.from))
	)

	if (
		!carriageObj ||
		!carriageObj.hasOwnProperty('carriages') ||
		!carriageObj.carriages
	) {
		train['carriages'] = null
		return
	}

	train['carriages'] = carriageObj.carriages
}

export default parseCarriages
