import * as FlashCardsApi from "../utils/FlashCardsApi";
import {
	GET_DECKS,
	GET_DECK,
	SAVE_DECK_TITLE,
	ADD_CARD_TO_DECK,
	DELETE_DECK
} from "./types";

export const getDecks = () => dispatch => {
	return FlashCardsApi.getDecks().then(decks =>
		dispatch({
			type: GET_DECKS,
			decks
		})
	);
};

export const getDeck = title => dispatch => {
	return FlashCardsApi.getDeck(title).then(deck =>
		dispatch({
			type: GET_DECK,
			deck
		})
	);
};

export const saveDeckTitle = title => dispatch => {
	return FlashCardsApi.saveDeckTitle(title).then(deck =>
		dispatch({
			type: SAVE_DECK_TITLE,
			deck
		})
	);
};

export const addCardToDeck = (title, card) => dispatch => {
	return FlashCardsApi.addCardToDeck(title, card).then(deck =>
		dispatch({
			type: ADD_CARD_TO_DECK,
			deck
		})
	);
};

export const deleteDeck = title => dispatch => {
	return FlashCardsApi.deleteDeck(title).then(decks =>
		dispatch({
			type: DELETE_DECK,
			decks
		})
	);
};