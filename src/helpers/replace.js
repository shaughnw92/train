import {
	A_TO_Z,
	FIRST_WORD,
	HYPHEN_UNDERSCORE,
	IN_BRACES,
	IN_BRACKETS,
} from '../constants/regex'

export const replaceAToZ = str => str.replace(A_TO_Z, '')

export const replaceAmpersand = str => str.replace('&', '')

export const replaceOnly = str => str.replace(' only', '')

export const replaceBrackets = str => str.replace(IN_BRACKETS, '')

export const replaceBraces = str => str.replace(IN_BRACES, '')

export const replaceColon = str => str.replace(':', '')

export const replaceSpace = str => str.replace(' ', '')

export const replaceWord = (str, firstWord, lastWord) =>
	str.replace(firstWord, lastWord)

export const replaceHyphenOrUpperscore = str =>
	str.replace(HYPHEN_UNDERSCORE, '')

export const replaceFirstWord = str => str.replace(FIRST_WORD, '')

export const replaceComma = str => str.replace(',', '')
