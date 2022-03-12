const formatTime = time => {
	if (time[0] !== '0') return time
	if (time[1] !== '0') return `oh ${time}`
	return `zero hundred hours ${time.slice(3)}`
}

export default formatTime
