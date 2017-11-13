import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { getDeck, deleteDeck } from "../actions/DeckActions";
import { white, purple, red } from "../utils/colors";

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerTitleStyle: {
      color: "rgba(0,0,0,0)"
    },
    headerRight: (
      <Button
        title="Add Card"
        backgroundColor="rgba(0,0,0,0)"
        color="#00B1FF"
        buttonStyle={{ padding: 0, margin: 0 }}
        borderRadius={5}
        onPress={() =>
          navigation.navigate("NewCard", {
            title: navigation.state.params.title
          })}
      />
    )
  });

  componentDidMount() {
    const { navigation, toNewCardScreen } = this.props;
    navigation.setParams({
      toNewCardScreen: toNewCardScreen
    });
  }

  confirmDelete = title => {
    const { deleteDeck, goBack } = this.props;
    Alert.alert("Delete Deck", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: () => {
          deleteDeck(title);
          goBack();
        }
      }
    ]);
  };

  render() {
    const {
      selectedDeck,
      deleteDeck,
      toQuizScreen,
      toNewCardScreen,
      navigation
    } = this.props;

    const { questions } = selectedDeck;
    const deckTitle = navigation.state.params.title && navigation.state.params.title;
    const deckQuestionsLength = questions ? questions.length : 0;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{deckTitle}</Text>
          <Text style={styles.cardLength}>{deckQuestionsLength} Cards</Text>
        </View>
        <View style={styles.buttonWrapper}>
          {deckQuestionsLength ? (
            <Button
              title={"Start Quiz"}
              buttonStyle={[styles.button, styles.quizButton]}
              color={purple}
              fontSize={24}
              large={true}
              onPress={() => toQuizScreen()}
            />
          ) : (
            <Button
              title={"Add Card"}
              buttonStyle={[styles.button, styles.quizButton]}
              color={purple}
              fontSize={24}
              large={true}
              onPress={() => toNewCardScreen()}
            />
          )}
          <Button
            title={"Delete Deck"}
            buttonStyle={[styles.button, styles.deleteButton]}
            color={red}
            fontSize={18}
            large={false}
            onPress={() => this.confirmDelete(deckTitle)}
          />
        </View>
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
  titleContainer: {
    alignItems: "center"
  },
  title: {
    fontSize: 48,
    marginBottom: 10
  },
  cardLength: {
    fontSize: 24,
    color: "silver"
  },
  button: {
    backgroundColor: white,
    borderWidth: 1,
    margin: 20
  },
  quizButton: {
    borderColor: purple
  },
  deleteButton: {
    borderColor: red
  }
});

const mapStateToProps = deckData => {
  const { selectedDeck } = deckData;
  return {
    selectedDeck
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { navigate, goBack } = navigation;
  return {
    toNewCardScreen: () => navigate("NewCard"),
    toQuizScreen: () => navigate("Quiz"),
    goBack: () => goBack(),
    deleteDeck: title => dispatch(deleteDeck(title))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeck);