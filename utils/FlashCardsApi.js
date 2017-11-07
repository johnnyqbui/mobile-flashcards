import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './_deck';

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
}

export const getDeck = id => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
    	const data = JSON.parse(results)
    	return data[id]
    })
}

export const saveDeckTitle = title => {
	return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
    	title,
    	questions: []
    }
  }))
}

export const addCardToDeck = (title, card) => {
	console.log({[title]:card})
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
		[title]: {
			questions: card
		}
	}))
}



// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
//     })
// }