import chooseVoice from '../setup/chooseVoice'
import configureSpeaker from '../setup/configureSpeaker'
import getVoices from '../setup/getVoices'
import playOnce from '../setup/playOnce'

const britishWoman = speech => {
	getVoices()
	const voice = chooseVoice('Fiona')
	const speaker = configureSpeaker(speech, voice, 'en')
	playOnce(speaker)
}

export default britishWoman
