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
import { purple, darkPurp } from "./utils/colors";

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: () => (
          <MaterialIcons name="view-list" size={35} color={"#E5E5E5"} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: () => (
          <FontAwesome name="plus-square" size={30} color={"#E5E5E5"} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: darkPurp,
      labelStyle: {
        fontSize: 14,
        color: "#E5E5E5"
      },
      showIcon: true,
      showLabel: true,
      style: {
        height: 56,
        backgroundColor: "#8883AE",

      }
    }
  }
);

export const rootNavigator = () => {
  return StackNavigator(
  {
    Home: {
      screen: Tabs
    },
    IndividualDeck: {
      screen: IndividualDeck,
      navigationOptions: {
        headerTintColor: "#00B1FF",
      }
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        headerTintColor: "#00B1FF",
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: "#00B1FF",
      }
    }
  },
  {
    cardStyle: {
      paddingTop: 0,
      marginTop: 0
    }
  }
  );
};