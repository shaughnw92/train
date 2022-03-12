import formatTime from '../../helpers/formatTime'

const serviceToCall = (expectedDeps, aimedDeps, operator) =>
	`${
		aimedDeps ? `${formatTime(aimedDeps)}` : `${formatTime(expectedDeps)}`
	}, ${operator} service to,`

export default serviceToCall
