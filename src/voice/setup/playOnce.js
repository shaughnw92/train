const playOnce = speaker => {
	window.utterances.push(speaker)
	speechSynthesis.resume()
	speechSynthesis.speak(speaker)
	window.utterances.pop()
}

export default playOnce
