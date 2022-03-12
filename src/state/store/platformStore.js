import axios from 'axios'
import {
	formatJourneyPlatforms,
	formatJourneys,
} from '../../helpers/formatData'
import { fromCurrentStation, notFirstItem } from '../../helpers/filter'
import { findIx, findViaStops } from '../../helpers/find'
import { snakeToCamelCaseObj } from '../../utils/case'

const usePlatformStore = (set, get) => ({
	platform: [],
	setPlatform: async () => {
		const departures = await get().departures
		const platformNo = get().currentPlatformNo

		set({
			platform: departures
				.filter((train, ix) => {
					if (platformNo === 'all') return ix < 3
					return train.platform === platformNo
				})
				.filter((train, ix) => {
					if (platformNo !== 'all') return ix < 3
					return train
				})
				.map((train, ix) => {
					train.position = ix + 1
					return train
				}),
		})
	},
	firstPlatformStop: [],
	secondPlatformStop: [],
	thirdPlatformStop: [],
	setFirstPlatformStop: async url => {
		const currentStation = get().stationName

		const response = await axios.get(url)

		set({
			firstPlatformStop: await response.data.stops
				.filter(notFirstItem)
				.map(stop => snakeToCamelCaseObj(stop))
				.filter((_, ix, arr) => ix > findIx(arr, 'stationName', currentStation))
				.map(formatJourneys)
				.map(formatJourneyPlatforms),
		})
	},
	setSecondPlatformStop: async url => {
		const currentStation = get().stationName

		const response = await axios.get(url)

		set({
			secondPlatformStop: await response.data.stops
				.filter(notFirstItem)
				.map(stop => snakeToCamelCaseObj(stop))
				.filter((_, ix, arr) => ix > findIx(arr, 'stationName', currentStation))
				.map(formatJourneys)
				.map(formatJourneyPlatforms),
		})
	},
	setThirdPlatformStop: async url => {
		const currentStation = get().stationName

		const response = await axios.get(url)

		set({
			thirdPlatformStop: await response.data.stops
				.filter(notFirstItem)
				.map(stop => snakeToCamelCaseObj(stop))
				.filter((_, ix, arr) => ix > findIx(arr, 'stationName', currentStation))
				.map(formatJourneys)
				.map(formatJourneyPlatforms),
		})
	},
	firstPlatformVia: '',
	setFirstPlatformVia: async () => {
		const currentStationCode = get().stationCode
		const firstPlatformStop = fromCurrentStation(
			get().firstPlatformStop,
			'stationCode',
			currentStationCode
		)

		const firstPlatformVia =
			(await findViaStops(firstPlatformStop, 'stationName')) || '_'

		set({
			firstPlatformVia,
		})
	},
	secondPlatformVia: '',
	setSecondPlatformVia: async () => {
		const currentStationCode = get().stationCode
		const secondPlatformStop = fromCurrentStation(
			get().secondPlatformStop,
			'stationCode',
			currentStationCode
		)

		const secondPlatformVia =
			(await findViaStops(secondPlatformStop, 'stationName')) || '_'

		set({
			secondPlatformVia,
		})
	},
	thirdPlatformVia: '',
	setThirdPlatformVia: async () => {
		const currentStationCode = get().stationCode
		const thirdPlatformStop = fromCurrentStation(
			get().thirdPlatformStop,
			'stationCode',
			currentStationCode
		)

		const thirdPlatformVia =
			(await findViaStops(thirdPlatformStop, 'stationName')) || '_'

		set({
			thirdPlatformVia,
		})
	},
})

export default usePlatformStore
