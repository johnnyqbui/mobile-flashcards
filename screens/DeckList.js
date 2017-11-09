import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { List } from 'react-native-elements'
import Deck from '../components/Deck';
import * as actions from "../actions/DeckActions"

class DeckList extends PureComponent {
  static navigationOptions = () => ({
    title: "Deck List",
  })

  componentDidMount() {
    const { getDecks, getDeck } = this.props;
    getDecks()
  }

  render() {
    const { decks, navigation } = this.props;
    console.log('run')
    return (
      <List>
        {Object.keys(decks).map((title, i) => 
          <Deck
            key={i}
            title={decks[title].title}
            questions={decks[title].questions}
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