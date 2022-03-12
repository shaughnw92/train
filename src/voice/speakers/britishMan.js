import chooseVoice from '../setup/chooseVoice'
import configureSpeaker from '../setup/configureSpeaker'
import getVoices from '../setup/getVoices'
import playOnce from '../setup/playOnce'

const britishMan = speech => {
	getVoices()
	const voice = chooseVoice('Daniel')
	const speaker = configureSpeaker(speech, voice, 'en-GB')
	playOnce(speaker)
}

export default britishMan
