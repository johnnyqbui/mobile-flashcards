import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import * as actions from "../actions/DeckActions"

class NewDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>New Deck</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(
  null,
  actions,
)(NewDeck)