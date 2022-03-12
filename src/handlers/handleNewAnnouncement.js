import translate from 'translate-js'
import { isGWRWestStation, isWelshStation } from '../helpers/isStation'
import isEven from '../utils/isEven'
import britishWoman from '../voice/speakers/britishWoman'
import welshMan from '../voice/speakers/welshMan'

const handleNewAnnouncement = (stationName, randomNumber, announcement) => {
	if (speechSynthesis.speaking) return
	if (isWelshStation(stationName)) {
		welshMan(translate(announcement), null, { locale: 'cy_GB' })
		britishWoman(announcement)
		return
	}

	if (isGWRWestStation(stationName) && isEven(randomNumber))
		return britishWoman(announcement)
	britishWoman(announcement)
}

export default handleNewAnnouncement
