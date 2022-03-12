const twoArraysToObject = (keyArray, valueArray) =>
	valueArray.reduce((acc, curr, ix) => ({ ...acc, [keyArray[ix]]: curr }), {})

export default twoArraysToObject
