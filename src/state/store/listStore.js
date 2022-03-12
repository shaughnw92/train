const useListStore = (set, get) => ({
	list: [],
	setList: async () => {
		const departures = await get().departures

		set({ list: departures.filter((_, ix) => ix < 20) })
	},
})

export default useListStore
