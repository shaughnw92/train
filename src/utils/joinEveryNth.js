const joinEveryNth = (array, nth) =>
	array
		.reduce((acc, curr, ix) => {
			const chunkIx = Math.floor(ix / nth)

			if (!acc[chunkIx]) acc[chunkIx] = []

			acc[chunkIx].push(curr)

			return acc
		}, [])
		.map(item => item.join('').trim())

export default joinEveryNth
