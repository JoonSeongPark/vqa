import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const DefaultText = props => {
  return <Text style={{...styles.text,...props.style}} onPress={props.onPress} >{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "kakao",
    color: Colors.mainColor
  }
});

export default DefaultText;
