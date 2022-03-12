import { STATION_KEYS, STATION_VALUES } from '../../constants/stations'
import sortStationList from '../../helpers/sortStationList'
import toRegex from '../../utils/toRegex'

const useStationStore = (set, get) => ({
	stationCode: '',
	setStationCode: () => {
		const input = get().input
		set({
			stationCode:
				STATION_KEYS.find(station =>
					station.includes(input.trim().toUpperCase())
				) ||
				STATION_KEYS[
					STATION_VALUES.findIndex(station =>
						station.match(toRegex(input, 'gi'))
					)
				],
		})
	},
	stationName: '',
	setStationName: () => {
		const input = get().input
		set({
			stationName:
				STATION_VALUES[
					STATION_KEYS.findIndex(station =>
						station.includes(input.trim().toUpperCase())
					)
				] ||
				STATION_VALUES.find(station => station.match(toRegex(input, 'gi'))),
		})
	},
	stationList: [],
	setStationList: () => {
		const input = get().input
		set({
			stationList: sortStationList(input),
		})
	},
})

export default useStationStore
