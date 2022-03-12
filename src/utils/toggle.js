export const toggleIfLength = (via, show, ix) =>
	via[ix] !== '_' ? !show[ix] : false

export const toggleIfValue = (platforms, show, ix) => {
	if (
		!platforms[ix] ||
		!platforms[ix].carriages ||
		platforms[ix].carriages === null ||
		!platforms[ix].status === 'CANCELLED'
	)
		return false
	return !show[ix]
}
