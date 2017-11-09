import { combineReducers } from 'redux';
import { GET_DECKS, GET_DECK, SAVE_DECK_TITLE, ADD_CARD_TO_DECK } from '../actions/types'

const deckDataState = {
  decks: {},
  selectedDeck: {}
};

const deckData = (state = deckDataState, action) => {
  const { decks, deck } = action
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        decks
      }
    case GET_DECK :
      return {
        ...state,
        selectedDeck: deck
      }
    case SAVE_DECK_TITLE :
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck
        },
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck
        },
        selectedDeck: deck
      }
    default :
      return state
  }
}

export default deckData