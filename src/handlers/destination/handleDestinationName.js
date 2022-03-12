import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { Fragment } from 'react'
import { isAirportStation } from '../../helpers/isStation'
import '../../components/style.scss'

const handleDestinationName = destination => {
	if (destination === '_' || typeof destination === 'undefined') return
	if (isAirportStation(destination))
		return (
			<span className='list__span'>
				{destination}{' '}
				<FontAwesomeIcon
					className='plane list__icon'
					size='xs'
					rotation={270}
					icon={faPlane}
				/>
			</span>
		)
	return <Fragment>{destination}</Fragment>
}

export default handleDestinationName
