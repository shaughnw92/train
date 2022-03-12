const parseCaldervale = (train, _, arr) => {
	const {
		originName,
		destinationName,
		departures: { expectedDeps },
	} = train
	if (!originName || !destinationName || !expectedDeps) return

	if (
		destinationName.includes('Leeds') &&
		originName.includes('Huddersfield') &&
		expectedDeps.match(/(31|32|33)/)
	)
		train.destinationName = 'Bramley'

	if (
		destinationName.includes('Huddersfield') &&
		originName.includes('Leeds') &&
		expectedDeps.match(/(29)/)
	)
		train.destinationName = 'Brighouse'
}

export default parseCaldervale
