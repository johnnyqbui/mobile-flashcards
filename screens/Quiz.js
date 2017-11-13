import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { roundScore, clearLocalNotification } from "../utils/helpers";
import { white, purple, green, red } from "../utils/colors";

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    showAnswer: false,
    score: 0,
    endQuiz: false
  };

  nextCard = option => {
    const { questions } = this.props.selectedDeck;
    this.setState(prevState => ({
      currentQuestion:
        prevState.currentQuestion !== questions.length - 1
          ? prevState.currentQuestion + 1
          : prevState.currentQuestion,
      showAnswer: false,
      score: option === "Correct" ? prevState.score + 1 : prevState.score,
      endQuiz: prevState.currentQuestion === questions.length - 1
    }));
  };

  flipCard = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      showAnswer: false,
      score: 0,
      endQuiz: false
    });
  };

  render() {
    const { goBack, selectedDeck } = this.props;
    const { questions } = selectedDeck;
    const { currentQuestion, showAnswer, score, endQuiz } = this.state;
    const questionLength = questions && questions.length;
    const question = questions && questions[currentQuestion].question;
    const answer = questions && questions[currentQuestion].answer;

    if (endQuiz) {
      clearLocalNotification();
      return (
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>
            You got {score} out of {questionLength}!
          </Text>
          <Text style={styles.score}>{roundScore(score, questionLength)}%</Text>
          <View style={styles.buttonsWrapper}>
            <Button
              title={"Restart Quiz"}
              large={true}
              buttonStyle={[styles.button, styles.correctButton]}
              onPress={() => this.restartQuiz()}
            />
            <Button
              title={"Back To Deck"}
              large={true}
              buttonStyle={[styles.button, styles.incorrectButton]}
              onPress={() => goBack()}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.currentQuestionNumber}>
          <Text>
            Question {currentQuestion + 1} out of {questionLength}
          </Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.question}>{showAnswer ? answer : question}</Text>
          <Button
            title={showAnswer ? "Show Question" : "Show Answer"}
            icon={{ name: "cycle", type: "entypo" }}
            buttonStyle={[styles.button, styles.answerButton]}
            onPress={() => this.flipCard()}
            large={true}
          />
          <View style={styles.buttonsWrapper}>
            <Button
              title={"Correct"}
              icon={{ name: "thumbsup", type: "octicon" }}
              buttonStyle={[styles.button, styles.correctButton]}
              onPress={() => this.nextCard("Correct")}
              large={true}
            />
            <Button
              title={"Incorrect"}
              icon={{ name: "thumbsdown", type: "octicon" }}
              buttonStyle={[styles.button, styles.incorrectButton]}
              onPress={() => this.nextCard("Incorrect")}
              large={true}
            />
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  currentQuestionNumber: {
    marginTop: 20,
    alignSelf: "center"
  },
  scoreContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  score: {
    fontSize: 24
  },
  questionCard: {
    flex: 1,
    width: width - 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "silver",
    margin: 20
  },
  question: {
    fontSize: 24,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  answerButton: {
    backgroundColor: purple,
    marginVertical: 20
  },
  buttonsWrapper: {
    marginTop: 20
  },
  button: {
    width: width / 1.33,
    margin: 10,
    padding: 15
  },
  correctButton: {
    backgroundColor: green
  },
  incorrectButton: {
    backgroundColor: red
  }
});

const mapStateToProps = deckData => {
  const { selectedDeck } = deckData;
  return {
    selectedDeck
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { navigate, goBack, state } = navigation;
  return {
    goBack: () => goBack()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);