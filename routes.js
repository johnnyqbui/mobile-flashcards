import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import DeckList from "./screens/DeckList";
import IndividualDeck from "./screens/IndividualDeck";
import NewDeck from "./screens/NewDeck";
import NewCard from "./screens/NewCard";
import Quiz from "./screens/Quiz";

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="view-list" size={35} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "purple" : "white",
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? "white" : "purple",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

export const rootNavigator = () => {
  return StackNavigator({
    Home: {
      screen: Tabs
    },
    IndividualDeck: {
      screen: IndividualDeck,
      navigationOptions: {
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "white",
          marginTop: -20,
        },
      }
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "white",
          marginTop: -20,
        }
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: "grey",
        headerStyle: {
          backgroundColor: "white",
          marginTop: -20,
        }
      }
    }
  });
};