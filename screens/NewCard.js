import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Animated } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as actions from "../actions/DeckActions";
import { createCard } from "../utils/helpers";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
    messageInfoOpacity: 0
  };

  addCard = (question, answer) => {
    const { addCardToDeck, selectedDeck, decks, messageInfoOpacity } = this.props;
    this.setState({
      question: "",
      answer: ""
    })
    Animated.timing(messageInfoOpacity, { 
      toValue: 1,
    }).start()
    const card = createCard(question, answer)
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
          value={question}
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          value={answer}
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


export default connect(mapStateToProps, actions)(NewCard);