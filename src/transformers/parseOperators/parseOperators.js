const parseOperator = operator => {
	if (!operator) return
	if (operator.includes('LNER')) return 'L N E R Azuma'
	if (operator.includes('Transport for Wales')) return 'Transportforwales'
	return operator
}

export default parseOperator
