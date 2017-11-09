import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  state = {
    currentQuestion: 0,
    showAnswer: false,
    score: 0,
    endQuiz: false
  };

  nextCard = (option) => {
    const { questions } = this.props.selectedDeck;
    this.setState(prevState => ({
      currentQuestion:
        prevState.currentQuestion !== questions.length - 1
          ? prevState.currentQuestion + 1
          : prevState.currentQuestion,
      score: option === "Correct" ? prevState.score + 1 : prevState.score,
      endQuiz: prevState.currentQuestion === questions.length - 1
    }));
  };

  flipCard = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }))
  }

  render() {
    const { title, questions } = this.props.selectedDeck;
    const { currentQuestion, showAnswer, score, endQuiz } = this.state;
    const questionLength = questions && questions.length;
    const question = questions && questions[currentQuestion].question;
    const answer = questions && questions[currentQuestion].answer;
    return (
      <View style={styles.container}>
      {endQuiz
        ? <View>
            <Text>You got {score} out of {questionLength} </Text>
          </View>
        : <View>
            <View style={styles.currentQuestionNumber}>
              <Text>Question {currentQuestion + 1} out of {questionLength}</Text>
            </View>
            <View style={styles.questionCard}>
              <Text style={styles.question}>{showAnswer ? answer : question}</Text>
                <Button
                  title={showAnswer ? "Question" : "Answer"}
                  icon={{ name: "cycle", type: "entypo" }}
                  buttonStyle={[styles.button, styles.answerButton]}
                  onPress={() => this.flipCard()}
                />
              <View style={styles.buttonsWrapper}>
                <Button
                  title={"Correct"}
                  icon={{ name: "thumbsup", type: "octicon" }}
                  buttonStyle={[styles.button, styles.correctButton]}
                  onPress={() => this.nextCard("Correct")}
                />
                <Button
                  title={"Incorrect"}
                  icon={{ name: "thumbsdown", type: "octicon" }}
                  buttonStyle={[styles.button, styles.incorrectButton]}
                  onPress={() => this.nextCard("Incorrect")}
                />
              </View>
            </View>
          </View>
      }
       
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
    marginTop: 20
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  answerButton: {
    backgroundColor: "#05b0fa",
    marginVertical: 20
  },
  buttonsWrapper: {
    marginTop: 20,
  },
  button: {
    width: width/1.33,
    margin: 10,
    padding: 15
  },
  correctButton: {
    backgroundColor: "#3DC162"
  },
  incorrectButton: {
    backgroundColor: "#d8262e"
  }
});

const mapStateToProps = deckData => {
  const { selectedDeck } = deckData;
  return {
    selectedDeck
  };
};

export default connect(mapStateToProps, null)(Quiz);