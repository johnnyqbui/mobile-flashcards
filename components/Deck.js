import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ListItem } from "react-native-elements";
import { getDeck } from "../actions/DeckActions";

const Deck = props => {
  const { title, questions, getDeck, selectedDeck, toDeckScreen } = props;

  const openDeck = title => {
    getDeck(title);
    toDeckScreen(title);
  };

  return (
    <ListItem
      key={title}
      title={title}
      badge={{ value: questions.length }}
      onPress={() => openDeck(title)}
    />
  );
};

const mapStateToProps = ({ selectedDeck }) => ({ selectedDeck });
const mapDispatchToProps = (dispatch, { navigation }) => {
  const { navigate } = navigation;
  return {
    getDeck: title => dispatch(getDeck(title)),
    toDeckScreen: title => navigate("IndividualDeck", { title })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);