import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as actions from "../actions/DeckActions";
import { createCard } from "../utils/helpers";
import { white, purple } from "../utils/colors";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
    message: "",
    messageInfoOpacity: new Animated.Value(0)
  };

  componentWillUnmount() {
    this.state.messageInfoOpacity.removeAllListeners()
  }

  addCard = (question, answer) => {
    const { messageInfoOpacity } = this.state;
    const { addCardToDeck, selectedDeck, decks } = this.props;
    if (question && answer) {
      this.setState({
        question: "",
        answer: "",
        message: "Card added"
      });
      const card = createCard(question, answer);
      addCardToDeck(selectedDeck.title, card);
    } else {
      this.setState({
        message: "Question and answer cannot be blank"
      });
    }

    Animated.sequence([
      Animated.timing(messageInfoOpacity, { toValue: 0.8, duration: 200 }),
      Animated.timing(messageInfoOpacity, { toValue: 0.8, duration: 2000 }),
      Animated.timing(messageInfoOpacity, { toValue: 0, duration: 200 })
    ]).start();
  };

  render() {
    const { question, answer, message, messageInfoOpacity } = this.state;

    return (
      <View style={styles.container}>
        {message.length > 0 && (
          <Animated.View
            style={[
              styles.messageInfoContainer,
              { opacity: messageInfoOpacity }
            ]}
          >
            <Text style={styles.messageInfo}>{message}</Text>
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
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
        </View>
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
    backgroundColor: "#fff"
  },
  inputContainer: {
    marginTop: 60,
    marginHorizontal: 10,
    alignSelf: "stretch"
  },
  input: {
    height: 50,
    fontSize: 16,
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "silver",
    backgroundColor: "#eee"
  },
  button: {
    backgroundColor: purple,
    margin: 20
  },
  messageInfo: {
    backgroundColor: "rgb(175,175,175)",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    overflow: "hidden"
  },
  messageInfoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center"
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