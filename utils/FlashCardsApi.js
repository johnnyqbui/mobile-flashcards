import { AsyncStorage } from "react-native";
import { FLASHCARDS_STORAGE_KEY } from "./_deck";
import { setInitialData } from "../utils/_deck";

export const getDecks = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    return results ? JSON.parse(results) : setInitialData()
  });
};

export const getDeck = title => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const deck = JSON.parse(results);
    return deck[title];
  });
};

export const saveDeckTitle = title => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    const newDeck = {
      ...decks,
      [title]: {
        title,
        questions: []
      }
    };
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDeck));
    return newDeck[title];
  });
};

export const addCardToDeck = (title, card) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    const updatedDeck = {
      ...decks,
      [title]: {
        title: title,
        questions: [...decks[title].questions, card]
      }
    };
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(updatedDeck));
    return updatedDeck[title];
  });
};

export const deleteDeck = title => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    decks[title] = undefined;
    delete decks[title];
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
    return decks;
  });
};