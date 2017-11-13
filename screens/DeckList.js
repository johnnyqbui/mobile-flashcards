import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { List } from "react-native-elements";
import Deck from "../components/Deck";
import * as actions from "../actions/DeckActions";
import { white, purple } from "../utils/colors";

class DeckList extends Component {
  static navigationOptions = () => ({
    title: "Deck List",
    headerStyle: {
      backgroundColor: purple,
    },
    headerTitleStyle: {
      color: white,
      alignSelf: 'center',
      fontSize: 24
    }
  });

  componentDidMount() {
    const { getDecks, getDeck } = this.props;
    getDecks();
  }

  render() {
    const { decks, navigation } = this.props;
    const arrDeck = Object.keys(decks).map(deck => deck);
    return (
      <List>
        <FlatList
          data={arrDeck}
          keyExtractor={item => decks[item].title}
          renderItem={({ item }) => (
            <Deck
              title={decks[item].title}
              questions={decks[item].questions}
              navigation={navigation}
            />
          )}
        />
      </List>
    );
  }
}

const mapStateToProps = deckData => {
  const { decks } = deckData;
  return {
    decks
  };
};

export default connect(mapStateToProps, actions)(DeckList);