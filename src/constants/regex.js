export const CAMEL_CASE = /[-_][a-z]/gi
export const HYPHEN_UNDERSCORE = /[-_]/gi
export const IN_BRACKETS = /\(([^()]+)\)/g
export const IN_BRACES = /\[(.*?)\]/g
export const SENTENCE_CASE = /\s+(.)/g
export const CAPITALISE = /(?:^|\s)\S/g

export const A_TO_Z = /[a-zA-Z]/gi
export const STARTS_WITH_A_TO_Z = /^[a-zA-Z]/gi
export const ENDS_IN_A_TO_Z = /[a-zA-Z]+$/gi

export const COMMAS_PERIODS = /[.,]/gi

export const SPACES = / /gi

export const FIRST_WORD = / .*/gi

export const LETTERS_SPACES = /^[A-Za-z ]+$/
