const parseHarrogate = (train, _, arr) => {
	const {
		originName,
		destinationName,
		departures: { expectedDeps },
	} = train
	if (!originName || !destinationName || !expectedDeps) return

	if (
		destinationName.includes('Leeds') &&
		originName.includes('York') &&
		expectedDeps.match(/(11|41)/)
	)
		train.destinationName = 'Burley Park'
	if (
		destinationName.includes('York') &&
		originName.includes('Leeds') &&
		expectedDeps.match(/(29|59)/)
	)
		train.destinationName = 'Poppelton'
}

export default parseHarrogate
