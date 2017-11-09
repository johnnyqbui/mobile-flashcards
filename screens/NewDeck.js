import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Animated, Alert } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as actions from "../actions/DeckActions";

class NewDeck extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  state = { title: "" };

  addDeck = (title) => {
    const { saveDeckTitle, selectedDeck, decks } = this.props;

    // Check if deck already exists
    const matchedInDeck = Object.keys(decks).filter(deck => deck === title)
    if (matchedInDeck.length) {
      Alert.alert("Deck Already Exists")
    } else {
      saveDeckTitle(title)
      this.setState({ title: "" })
      Alert.alert("Deck Added")
    }
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={title => this.setState({ title })}
        />
        <Button
          title={"Add Deck"}
          buttonStyle={styles.button}
          color={"#fff"}
          fontSize={24}
          large={true}
          onPress={() => this.addDeck(title)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 50,
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 50,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#eee',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: "#00B1FF",
    borderWidth: 1,
    borderColor: "#00B1FF",
    margin: 20
  },
});

const mapStateToProps = deckData => {
  const { selectedDeck, decks } = deckData;
  return {
    selectedDeck,
    decks
  };
};


export default connect(mapStateToProps, actions)(NewDeck);