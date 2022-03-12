import React from 'react'
import classnames from 'classnames'

const Radio = (
	{ onClick = () => {}, state, currentState, setCurrentState, className },
	ref
) => (
	<div className='container__radio'>
		{state.map((item, ix) => (
			<button
				key={ix}
				ref={ref}
				className={classnames(
					'button capitalise',
					currentState === item && 'active',
					className
				)}
				onClick={e => {
					setCurrentState(e)
					onClick()
				}}
			>
				{item}
			</button>
		))}
	</div>
)

export default React.forwardRef(Radio)
