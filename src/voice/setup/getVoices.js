import voiceOnMount from './voiceOnMount'

const getVoices = () => {
	window.onload = () => voiceOnMount
	window.speechSynthesis.onvoiceschanged = () => voiceOnMount
}

export default getVoices
