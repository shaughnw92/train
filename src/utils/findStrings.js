import { FIRST_WORD } from '../constants/regex'
import { replaceFirstWord } from '../helpers/replace'

export const notFirstWord = str =>
	typeof str === 'string' && str.split(' ').slice(1)
export const isFirstWord = str => replaceFirstWord(str)
