import voiceOnMount from './voiceOnMount'
import getVoices from './getVoices'

const chooseVoice = (voice = voiceOnMount, voiceName) =>
	getVoices() && voice.filter(({ name }) => name === voiceName)[0]

export default chooseVoice
