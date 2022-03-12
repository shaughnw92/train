import create from 'zustand'
import useDataStore from './store/dataStore'
import useStationStore from './store/stationStore'
import useTypeStore from './store/typeStore'
import { devtools } from 'zustand/middleware'
import usePlatformStore from './store/platformStore'
import useLongDestinationStore from './store/longDestinationStore'
import useListStore from './store/listStore'
import useAnnouncementStore from './store/announcementStore'
import useInputStore from './store/inputStore'

const useStore = create(
	devtools((set, get) => ({
		...useAnnouncementStore(set, get),
		...useDataStore(set, get),
		...useInputStore(set, get),
		...useStationStore(set, get),
		...useTypeStore(set),
		...usePlatformStore(set, get),
		...useLongDestinationStore(set, get),
		...useListStore(set, get),
	}))
)

export default useStore
