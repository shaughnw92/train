import axios from 'axios'
import { notFirstItem } from '../../helpers/filter'
import { findIx, findViaStops } from '../../helpers/find'
import {
	formatJourneyPlatforms,
	formatJourneys,
} from '../../helpers/formatData'
import { snakeToCamelCaseObj } from '../../utils/case'

const useLongDestinationStore = (set, get) => ({
	longDestination: [],
	setLongDestination: async () => {
		const departures = await get().departures
		const platformNo = get().currentPlatformNo

		set({
			longDestination: departures
				.filter((train, ix) => {
					if (platformNo === 'all') return ix < 1
					return train.platform === platformNo
				})
				.filter((train, ix) => {
					if (platformNo !== 'all') return ix < 1
					return train
				}),
		})
	},
	longDestinationStop: [],
	setLongDestinationStop: async url => {
		const currentStation = get().stationName
		const response = await axios.get(url)

		const longDestinationStop = await response.data.stops
			.filter(notFirstItem)
			.map(stop => snakeToCamelCaseObj(stop))
			.filter((_, ix, arr) => ix > findIx(arr, 'stationName', currentStation))
			.map(formatJourneys)
			.map(formatJourneyPlatforms)

		set({ longDestinationStop })
	},
	longDestinationVia: '',
	setLongDestinationVia: () => {
		const currentStationCode = get().stationCode
		const longDestinationStop = get().longDestinationStop.filter(
			(_, ix, arr) => ix > findIx(arr, 'stationCode', currentStationCode)
		)

		const longDestinationVia =
			findViaStops(longDestinationStop, 'stationName') || '_'
		set({
			longDestinationVia,
		})
	},
})

export default useLongDestinationStore
