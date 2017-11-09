import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as actions from "../actions/DeckActions";

class NewDeck extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  state = {
    title: ""
  };

  addDeck = (title) => {
    const { saveDeckTitle, selectedDeck, decks } = this.props;
    saveDeckTitle(title)
    this.setState({ title: "" })
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
    paddingTop: 50
  },
  input: {
    height: 50,
    fontSize: 16,
    margin: 15,
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
  }
});

const mapStateToProps = deckData => {
  const { selectedDeck, decks } = deckData;
  return {
    selectedDeck,
    decks
  };
};


export default connect(mapStateToProps, actions)(NewDeck);