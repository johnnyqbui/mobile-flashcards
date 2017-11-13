import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Alert,
  Keyboard
} from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { saveDeckTitle, getDeck } from "../actions/DeckActions";
import {
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from "../utils/helpers";
import { white, purple } from "../utils/colors";

class NewDeck extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = { title: "" };

  addDeck = title => {
    const { decks, addNewDeck } = this.props;
    if (title.length === 0) {
      return Alert.alert("Title cannot be empty");
    }

    // Check if deck already exists
    const matchedInDeck = Object.keys(decks).filter(deck => deck === title);
    if (matchedInDeck.length) {
      Alert.alert("Deck Already Exists");
    } else {
      this.setState({ title: "" });
      Keyboard.dismiss();
      clearLocalNotification();
      setLocalNotification();
      addNewDeck(title)
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
          title={"Create Deck"}
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
    backgroundColor: "#fff"
  },
  input: {
    height: 50,
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 50,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "silver",
    backgroundColor: "#eee",
    alignSelf: "stretch"
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: purple,
    margin: 20
  }
});

const mapStateToProps = deckData => {
  const { decks } = deckData;
  return {
    decks
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { navigate } = navigation;
  return {
    addNewDeck: title => dispatch(saveDeckTitle(title)).then(() =>
      dispatch(getDeck(title)),
      navigate("IndividualDeck", { title })
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);