import originAndDestinationIncludes from '../../helpers/originAndDestinationIncludes'

const parseScotRail = train => {
	const {
		originName,
		destinationName,
		departures: { expectedDeps },
	} = train
	if (!originName || !destinationName || !expectedDeps) return

	if (
		originAndDestinationIncludes(
			{ originName, destinationName, expectedDeps },
			'Glasgow Queen Street',
			'Edinburgh Waverley',
			/(15|45)/
		)
	)
		train.operatorName = `${train.operatorName} Express`
}

export default parseScotRail
