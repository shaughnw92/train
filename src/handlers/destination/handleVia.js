import { Fragment } from 'react'
import { isAirportStation } from '../../helpers/isStation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

const handleVia = via => {
	if (via === '_' || typeof via === 'undefined') return
	if (isAirportStation(via))
		return (
			<Fragment>
				via {via}{' '}
				<FontAwesomeIcon
					className='plane'
					size='xs'
					rotation={270}
					icon={faPlane}
				/>
			</Fragment>
		)
	return <Fragment>via {via}</Fragment>
}

export default handleVia
