const parseOpenAccessCarriages = train => {
	if (train.operatorName !== ('Hull Trains' || 'Grand Central' || 'Lumo'))
		return
	train['carriages'] = 5
}

export default parseOpenAccessCarriages
