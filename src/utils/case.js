import { CAMEL_CASE, SENTENCE_CASE, CAPITALISE } from '../constants/regex'
import { replaceHyphenOrUpperscore, replaceSpace } from '../helpers/replace'

export const snakeToCamelCase = string =>
	string.replace(CAMEL_CASE, str =>
		replaceHyphenOrUpperscore(str.toUpperCase())
	)

export const trimToUpperCase = string => string.trim().toUpperCase()

export const sentenceToCamelCase = string =>
	string.replace(SENTENCE_CASE, (_, group) => group.toUpperCase())

export const sentenceToUpperCamelCase = string =>
	string.replace(CAPITALISE, str => replaceSpace(str.toUpperCase()))

export const snakeToCamelCaseObj = obj =>
	Object.keys(obj).reduce((acc, curr) => {
		acc[snakeToCamelCase(curr)] = obj[curr]
		return acc
	}, {})

export const capitalise = string => string[0].toUpperCase() + string.slice(1)

export const sentenceToKebabCase = string =>
	string.replace(/\s+/g, '-').toLowerCase()
