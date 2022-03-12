import chooseVoice from '../setup/chooseVoice'
import configureSpeaker from '../setup/configureSpeaker'
import getVoices from '../setup/getVoices'
import playOnce from '../setup/playOnce'
import translate from 'translate-js'

const welshMan = speech => {
	getVoices()
	const toWelsh = translate(speech, null, { locale: 'cy_GB' })
	const voice = chooseVoice('Daniel')
	const speaker = configureSpeaker(toWelsh, voice, 'en-GB')
	playOnce(translate(speaker, null, { locale: 'cy_GB' }))
}

export default welshMan
