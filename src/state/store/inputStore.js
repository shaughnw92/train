import { IN_BRACES, IN_BRACKETS, LETTERS_SPACES } from '../../constants/regex'

const useInputStore = set => ({
	tooltip: false,
	setTooltip: tooltip =>
		set({
			tooltip,
		}),
	input: '',
	setInputChange: e => {
		const keyContainsLetters = LETTERS_SPACES.test(e.nativeEvent.data)
		if (!keyContainsLetters || typeof keyContainsLetters === 'undefined') return
		set({ input: e.target.value })
	},
	setTooltipChange: e =>
		set({
			input: e.target.textContent
				.replace(IN_BRACKETS, '')
				.replace(IN_BRACES, '')
				.trim(),
		}),
})

export default useInputStore
