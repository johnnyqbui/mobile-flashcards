import * as FlashCardsApi from '../utils/FlashCardsApi';
import { GET_DECKS, GET_DECK, SAVE_DECK_TITLE, ADD_CARD_TO_DECK } from "./types";

export const getDecks = () => dispatch => {
	FlashCardsApi.getDecks().then(decks => 
		dispatch({
			type: GET_DECKS,
    	decks,
		})
	)
}

export const getDeck = id => dispatch => {
	FlashCardsApi.getDeck(id).then(deck => 
		dispatch({
			type: GET_DECK,
    	deck,
		})
	)
}

export const saveDeckTitle = title => dispatch => {
	FlashCardsApi.saveDeckTitle(title).then(deck => 
		dispatch({
			type: SAVE_DECK_TITLE,
			deck
		})
	)
}

export const addCardToDeck = (title, card) => dispatch => {
	FlashCardsApi.addCardToDeck(title, card).then(deck => 
		dispatch({
			type: ADD_CARD_TO_DECK,
			deck
		})
	)
}



