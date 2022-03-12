const startsWithVowel = string =>
	typeof string === 'string' && /[AEIOU]/.test(string[0])

export default startsWithVowel
