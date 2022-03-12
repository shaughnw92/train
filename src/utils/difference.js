const difference = (aimed, expected, numeric) =>
	Math.abs(aimed - expected) > numeric ? true : false

export default difference
