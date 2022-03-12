const arrayLength = (array, not = false) =>
	array.every(arr => (not ? !arr.length : arr.length))

export default arrayLength
