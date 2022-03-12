import { replaceColon } from '../helpers/replace'

const timeToNumber = string =>
	string && string.match(':') ? Number(replaceColon(string)) : Number(string)

export default timeToNumber
