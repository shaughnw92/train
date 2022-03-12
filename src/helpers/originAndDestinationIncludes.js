const originAndDestinationIncludes = (
	{ originName, destinationName, expectedDeps },
	stationOne,
	stationTwo,
	regex
) =>
	expectedDeps.match(regex) &&
	((originName.includes(stationOne) && destinationName.includes(stationTwo)) ||
		(destinationName.includes(stationOne) && originName.includes(stationTwo)))

export default originAndDestinationIncludes
