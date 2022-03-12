const standardCheck = variable =>
	variable.length === 0 || !variable || typeof variable === 'undefined'
const underscoreCheck = variable => standardCheck(variable) || variable === '_'
const strictCheck = (variable, underscore = false) =>
	underscore ? underscoreCheck(variable) : standardCheck(variable)

export default strictCheck
