const configureSpeaker = (speech, voice, lang) => {
	window.utterances = []
	const utterance = new SpeechSynthesisUtterance(speech)
	utterance.voice = voice
	utterance.lang = lang
	utterance.pitch = 1
	utterance.rate = 0.65
	utterance.onend = () => speechSynthesis.pause()
	return utterance
}

export default configureSpeaker
