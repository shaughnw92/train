import useStore from '../state/global'

const mapStore = array =>
	array.reduce(
		(acc, curr) =>
			useStore(state => ({
				[curr]: state[curr],
				...acc,
			})),
		{}
	)

export default mapStore
