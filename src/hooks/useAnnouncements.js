import { useEffect } from 'react'
import chooseVoice from '../voice/setup/chooseVoice'
import configureSpeaker from '../voice/setup/configureSpeaker'
import playOnce from '../voice/setup/playOnce'
import translate from 'translate-js'

const useAnnouncements = ({ speech, welsh }) => {
	const announcement = welsh
		? translate(speech, null, { locale: 'cy' })
		: speech
	const voice = chooseVoice(welsh ? 'Daniel' : 'Fiona')
	const speaker = configureSpeaker(announcement, voice)

	useEffect(() => {
		playOnce(speaker)
		speechSynthesis.addEventListener(
			'end',
			() => speechSynthesis.speaking && speechSynthesis.cancel()
		)

		return () =>
			speechSynthesis.removeEventListener('end', () => speechSynthesis.cancel())
	}, [])

	return speaker
}

export default useAnnouncements
