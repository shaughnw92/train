import difference from '../utils/difference'
import timeToNumber from '../utils/timeToNumber'

const handleJourneyType = (
	{ aimedArrs, expectedArrs },
	{ aimedDeps, expectedDeps },
	direction
) => {
	switch (direction) {
		case 'arrivals':
			const aimedArrsNum = timeToNumber(aimedArrs)
			const expectedArrsNum = timeToNumber(expectedArrs)

			if (aimedArrs === expectedArrs || !aimedArrsNum || !expectedArrsNum)
				return 'On time'
			else if (
				expectedArrsNum >
				timeToNumber(
					`${new Date().getHours()}:${
						new Date().getMinutes() < 10 ? '0' : '' + new Date().getMinutes()
					}`
				)
			)
				return 'Boarding'
			else if (
				aimedArrsNum >= expectedArrsNum &&
				difference(aimedArrsNum, expectedArrsNum, 100)
			)
				return 'Delayed'
			else if (
				aimedArrsNum >= expectedArrsNum &&
				!difference(aimedArrsNum, expectedArrsNum, 100)
			)
				return `Exp. ${expectedArrs}`
			return 'On time'

		case 'departures':
			const aimedDepsNum = timeToNumber(aimedDeps)
			const expectedDepsNum = timeToNumber(expectedDeps)

			if (aimedDeps === expectedDeps || !aimedDepsNum || !expectedDepsNum)
				return 'On time'
			else if (
				aimedDepsNum >= expectedDepsNum &&
				difference(aimedDepsNum, expectedDepsNum, 100)
			)
				return 'Delayed'
			else if (
				aimedDepsNum >= expectedDepsNum ||
				!difference(aimedDepsNum, expectedDepsNum, 100)
			)
				return `Exp. ${expectedDeps}`
			return 'On time'

		default:
			return 'On time'
	}
}

export default handleJourneyType
