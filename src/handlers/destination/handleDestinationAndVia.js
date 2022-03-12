import { Fragment } from 'react'
import { isAirportStation } from '../../helpers/isStation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

const handleDestinationAndVia = (
	destination,
	filteredVia = null,
	showVia = false
) => {
	if (destination === '_' || typeof destination === 'undefined') return
	if (isAirportStation(destination) && (showVia || filteredVia === '_')) {
		return (
			<Fragment>
				{destination}{' '}
				<FontAwesomeIcon
					className='plane'
					size='xs'
					rotation={270}
					icon={faPlane}
				/>
			</Fragment>
		)
	}
	if (
		showVia ||
		!filteredVia ||
		filteredVia === '_' ||
		typeof filteredVia === 'undefined'
	)
		return <Fragment>{destination}</Fragment>
	if (isAirportStation(filteredVia) && !showVia) {
		return (
			<Fragment>
				via {filteredVia}{' '}
				<FontAwesomeIcon
					className='plane'
					size='xs'
					rotation={270}
					icon={faPlane}
				/>
			</Fragment>
		)
	}
	if (!showVia) return <Fragment>via {filteredVia}</Fragment>
}

export default handleDestinationAndVia
