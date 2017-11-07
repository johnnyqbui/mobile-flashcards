import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { List } from 'react-native-elements'
import Deck from '../components/Deck';
import * as actions from "../actions/DeckActions"

class DeckList extends Component {
  componentDidMount() {
    const { getDecks, getDeck } = this.props;
    getDecks()
  }

  render() {
    const { decks, navigation } = this.props;
    console.log(decks)
    return (
      <List>
        {Object.keys(decks).map((key, i) => 
          <Deck
            key={i}
            title={decks[key].title}
            questions={decks[key].questions}
            navigation={navigation}
          />
        )}
      </List>
    );
  }
}

const mapStateToProps = (deckData) => {
  const { decks } = deckData;
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
  actions,
)(DeckList)