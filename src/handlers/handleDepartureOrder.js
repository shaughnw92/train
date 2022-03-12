const handleDepartureOrder = ix => {
	if (ix === 1) return `${ix}st`
	if (ix === 2) return `${ix}nd`
	if (ix === 3) return `${ix}rd`
}

export default handleDepartureOrder
