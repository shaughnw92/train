import {
	formatJourneyPlatforms,
	formatJourneys,
} from '../../helpers/formatData'
import { snakeToCamelCaseObj } from '../../utils/case'
import axios from 'axios'

const useDataStore = (set, get) => ({
	link: '',
	setLink: link => set({ link }),
	data: {},
	setData: async () => {
		const link = get().link
		const response = await axios.get(link)
		const currentStation = get().stationName

		set({
			data: await response.data,
			departures: await response.data.departures.all
				.map(train => snakeToCamelCaseObj(train))
				.map(train => (train['stationName'] = currentStation) && train)
				.map(formatJourneys)
				.map(formatJourneyPlatforms),
		})
	},
	departures: [],
	setDepartures: async departures =>
		set({
			departures,
		}),
	platformList: [],
	setPlatformList: async () => {
		const departures = await get().departures
		const departurePlatforms = departures.map(({ platform }) => platform)
		const setPlatforms = [...new Set(departurePlatforms)]
		const platformList = [
			...setPlatforms
				.filter(platforms => platforms !== '-')
				.filter(Boolean)
				.sort((a, b) => a - b),
			'all',
		]
		await set({ platformList })
	},
	currentPlatformNo: 'all',
	setPlatformNo: e =>
		set(state => ({
			currentPlatformNo: state.platformList.find(
				platform => e.currentTarget.textContent === platform
			),
		})),
	resetPlatformNo: () => set({ currentPlatformNo: 'all' }),
})

export default useDataStore
