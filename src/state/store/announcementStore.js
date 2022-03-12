import { cloneDeep } from 'lodash'
import { FIRST_CLASS_OPERATORS } from '../../constants/misc'
import { IN_BRACKETS } from '../../constants/regex'
import { STOPS_CONTAINS_REQUEST } from '../../constants/stations'
import { findIx } from '../../helpers/find'
import { firstArrayItem } from '../../helpers/filter'
import { formatAnnouncements, formatVoice } from '../../helpers/formatData'
import {
	delayedAnnouncement,
	securityAnnouncement,
	standardAnnouncement,
	stationAnnouncement,
} from '../../voice/announcements'
import parseOperators from '../../transformers/parseOperators/parseOperators'

const useAnnouncementStore = (set, get) => ({
	passengerAnnouncements: '',
	setPassengerAnnouncements: stops => {
		const currentStation = get().stationName
		const formattedStops = cloneDeep(stops)
			.filter((_, ix, arr) => ix > findIx(arr, 'stationName', currentStation))
			.map(formatAnnouncements)

		const passengerAnnouncementString = formattedStops
			.join(', ')
			.replaceAll(' (null)', '')

		const finalPassengerAnnouncement = passengerAnnouncementString.includes(
			'(x)'
		)
			? `${passengerAnnouncementString} && ${STOPS_CONTAINS_REQUEST}`
			: passengerAnnouncementString

		set({
			passengerAnnouncements: finalPassengerAnnouncement,
		})
	},
	standardAnnouncement: '',
	stationAnnouncement: '',
	delayedAnnouncement: '',
	seeItSayItSorted: '',
	setVoiceAnnouncements: (stops, departures) => {
		const currentStation = get().stationName
		const destinationVia = get().longDestinationVia
		const firstPlatformVia = get().firstPlatformVia

		const voiceArray = cloneDeep(stops)
			.filter((_, ix, arr) => ix > findIx(arr, 'stationName', currentStation))
			.map(formatVoice)

		const requestStops =
			voiceArray
				.filter(({ requestStops }) => Boolean(requestStops))
				.join(',') || ''

		departures.filter(firstArrayItem).map(train => {
			const newVoiceObj = {
				platform: train.platform,
				subPlatform: train.subPlatform,
				expectedDeps: train.departures.expectedDeps,
				aimedDeps: train.departures.aimedDeps,
				operator: parseOperators(train.operatorName),
				destination: cloneDeep(voiceArray[voiceArray.length - 1])
					?.replace('&', '')
					?.replace(' only', ''),
				origin: departures[0].originName,
				firstClass: FIRST_CLASS_OPERATORS.includes(train.operatorName),
				stops: voiceArray.join(', ').replace(IN_BRACKETS, ''),
				viaStops: destinationVia || firstPlatformVia,
				stopsArray: voiceArray,
				requestStops,
				currentStation,
				carriages: train.carriages,
				expectedDep: train.departures.expectedDeps,
				aimedDep: train.departures.aimedDeps,
				bus: train.status === 'BUS',
				startsHere: train.status === 'STARTS HERE',
				cancelled: train.status === 'CANCELLED',
			}

			set({
				standardAnnouncement: standardAnnouncement(newVoiceObj),
				stationAnnouncement: stationAnnouncement(newVoiceObj),
				delayedAnnouncement: delayedAnnouncement(newVoiceObj),
				seeItSayItSorted: securityAnnouncement(newVoiceObj),
			})

			return train
		})
	},
	clearStationAnnouncement: () => set({ stationAnnouncement: '' }),
	clearDelayedAnnouncement: () => set({ delayedAnnouncement: '' }),
})

export default useAnnouncementStore
