import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerTitleStyle: {
      color: "rgba(0,0,0,0)",
    },
    headerRight: (
      <Button
        title="Add Card"
        backgroundColor="rgba(0,0,0,0)"
        color="#00B1FF"
        buttonStyle={{ padding: 0, margin: 0 }}
        borderRadius={5}
        onPress={() =>
          navigation.navigate("NewCard", {title: navigation.state.params.title})}
      />
    )
  });

  componentDidMount() {
    this.props.navigation.setParams({
      toNewCardScreen: this.props.toNewCardScreen
    });
  }

  render() {
    const { selectedDeck, toQuizScreen } = this.props;
    const { title, questions } = this.props.selectedDeck;
    const deckTitle = title && title;
    const deckQuestionsLength = questions && questions.length;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{deckTitle}</Text>
          <Text style={styles.cardLength}>{deckQuestionsLength} Cards</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title={"Start Quiz"}
            buttonStyle={styles.button}
            color={"#00B1FF"}
            fontSize={24}
            large={true}
            onPress={() => toQuizScreen()}
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
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#00B1FF",
    margin: 20
  }
});

const mapStateToProps = deckData => {
  const { selectedDeck } = deckData;
  return {
    selectedDeck
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { navigate } = navigation;
  return {
    toNewCardScreen: title => navigate("NewCard", { title }),
    toQuizScreen: title => navigate("Quiz", { title })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeck);