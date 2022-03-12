import { DISPLAY_VALUES, JOURNEY_TYPE } from '../../constants/display'

const useTypeStore = set => ({
	direction: JOURNEY_TYPE,
	currentDirection: JOURNEY_TYPE[0],
	setDirection: e =>
		set(state => ({
			currentDirection: state.direction.find(
				journey => e.currentTarget.textContent === journey
			),
		})),
	displayType: DISPLAY_VALUES,
	currentDisplayType: DISPLAY_VALUES[0],
	setDisplayType: e =>
		set(state => ({
			currentDisplayType: state.displayType.find(
				display => e.currentTarget.textContent === display
			),
			currentDirection: state.currentDisplayType !== 'list' && JOURNEY_TYPE[0],
		})),
})

export default useTypeStore
