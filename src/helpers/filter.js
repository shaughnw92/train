import { findIx } from './find'

export const lastArrayItem = (_, ix, arr) => ix === arr.length - 1
export const firstArrayItem = (_, ix) => ix === 0
export const notFirstItem = (_, ix) => ix !== 0
export const notLastItem = (_, ix, arr) => ix !== arr.length - 1

export const fromCurrentStation = (array, key, property) =>
	array.filter((_, ix, arr) => ix > findIx(arr, key, property))
