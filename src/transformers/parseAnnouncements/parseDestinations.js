import { ABBREVIATIONS } from '../../constants/stations'
import { findAbbreviationIx } from '../../helpers/find'
import { replaceBrackets } from '../../helpers/replace'
import { isFirstWord, notFirstWord } from '../../utils/findStrings'

const parseDestinations = destination => {
	if (destination === '_' || typeof destination === 'undefined') return
	const abvExists = ABBREVIATIONS.some(abv =>
		notFirstWord(destination).includes(abv.original)
	)

	const originalIx = findAbbreviationIx(destination, 'original')

	const destiNoBrackets = replaceBrackets(destination)

	if (abvExists) {
		return destiNoBrackets.replace(
			ABBREVIATIONS[originalIx].original,
			ABBREVIATIONS[originalIx].new
		)
	}

	if (isFirstWord(destination) === 'Birmingham')
		return destiNoBrackets.replace('Birmingham', "B'ham")

	return destiNoBrackets
}

export default parseDestinations
