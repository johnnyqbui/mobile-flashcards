import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as actions from "../actions/DeckActions";
import { addCard } from "../utils/helpers";

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  state = {
    question: "",
    answer: ""
  };

  addCard = (question, answer) => {
    const { addCardToDeck, selectedDeck, decks } = this.props;
    const card = addCard(decks, selectedDeck.title, question, answer)
    console.log(card)
    addCardToDeck(selectedDeck.title, card)
  };

  render() {
    const { question } = this.state;
    const { answer } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
        />
        <Button
          title={"Add Card"}
          buttonStyle={styles.button}
          color={"#fff"}
          fontSize={24}
          large={true}
          onPress={() => this.addCard(question, answer)}
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
    justifyContent: "center"
  },
  input: {
    height: 40,
    fontSize: 14,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#eee',
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 5
  },
  button: {
    backgroundColor: "#00B1FF",
    borderWidth: 1,
    borderColor: "#00B1FF",
    margin: 20
  }
});

const mapStateToProps = deckData => {
  const { decks, selectedDeck } = deckData;
  return {
    decks,
    selectedDeck
  };
};


export default connect(mapStateToProps, actions)(NewCard);