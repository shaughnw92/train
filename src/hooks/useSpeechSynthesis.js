import { useEffect, useState } from 'react'
import splitVoice from '../voice/setup/splitVoice'

const useSpeechSynthesis = (props = {}) => {
	const { onEnd = () => {} } = props
	const [voices, setVoices] = useState([])
	const [speaking, setSpeaking] = useState(false)
	const [supported, setSupported] = useState(false)

	const processVoices = voiceOptions => setVoices(voiceOptions)

	const getVoices = () => {
		// Firefox seems to have voices upfront and never calls the
		// voiceschanged event
		let voiceOptions = window.speechSynthesis.getVoices()
		if (voiceOptions.length > 0) return processVoices(voiceOptions)

		window.speechSynthesis.onvoiceschanged = event => {
			voiceOptions = event.target.getVoices()
			processVoices(voiceOptions)
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			setSupported(true)
			getVoices()
		}
	}, [])

	const speak = (args = {}) => {
		const { voice = null, text = '', rate = 1, pitch = 1, volume = 1 } = args
		if (!supported) return
		setSpeaking(true)
		// Firefox won't repeat an utterance that has been
		// spoken, so we need to create a new instance each time
		const textList = splitVoice(text)
		textList.map((speech, ix, arr) => {
			const utterance = new window.SpeechSynthesisUtterance(speech)
			utterance.voice = voice
			utterance.onend = () => {
				setSpeaking(false)
				onEnd()
				if (ix !== arr.length - 1) return
				speechSynthesis.pause()
			}
			utterance.rate = rate
			utterance.pitch = pitch
			utterance.volume = volume
			speechSynthesis.speak(utterance)
			return speech
		})
	}

	const cancel = () => {
		if (!supported) return
		setSpeaking(false)
		window.speechSynthesis.cancel()
	}

	return {
		supported,
		speak,
		speaking,
		cancel,
		voices,
	}
}

export default useSpeechSynthesis
