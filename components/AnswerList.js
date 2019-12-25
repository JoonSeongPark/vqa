import React from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

const AnswerList = props => {
  return (
    <View>
      <View style={styles.resultLine}>
        <View style={styles.answer}>
          <DefaultText>{props.result[0].answer}</DefaultText>
        </View>
        <View style={styles.probContainer}>
          <View style={{...styles.prob,...{width: props.result[0].prob+'%'}}}>
          </View>
            <DefaultText >
              {props.result[0].prob.toFixed(2)+' %'}
            </DefaultText>
        </View>
      </View>
      <View style={styles.resultLine}>
        <View style={styles.answer}>
          <DefaultText>{props.result[1].answer}</DefaultText>
        </View>
        <View style={styles.probContainer}>
          <View style={{...styles.prob,...{width: props.result[1].prob+'%'}}}>
          </View>
            <DefaultText >
              {props.result[1].prob.toFixed(2)+' %'}
            </DefaultText>
        </View>
      </View>
      <View style={styles.resultLine}>
        <View style={styles.answer}>
          <DefaultText>{props.result[2].answer}</DefaultText>
        </View>
        <View style={styles.probContainer}>
          <View style={{...styles.prob,...{width: props.result[2].prob+'%'}}}>
          </View>
            <DefaultText >
              {props.result[2].prob.toFixed(2)+' %'}
            </DefaultText>
        </View>
      </View>
      <View style={styles.resultLine}>
        <View style={styles.answer}>
          <DefaultText>{props.result[3].answer}</DefaultText>
        </View>
        <View style={styles.probContainer}>
          <View style={{...styles.prob,...{width: props.result[3].prob+'%'}}}>
          </View>
            <DefaultText >
              {props.result[3].prob.toFixed(2)+' %'}
            </DefaultText>
        </View>
      </View>
      <View style={styles.resultLine}>
        <View style={styles.answer}>
          <DefaultText>{props.result[4].answer}</DefaultText>
        </View>
        <View style={styles.probContainer}>
          <View style={{...styles.prob,...{width: props.result[4].prob+'%'}}}>
          </View>
            <DefaultText >
              {props.result[4].prob.toFixed(2)+' %'}
            </DefaultText>
        </View>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  resultLine: {
    flexDirection: "row",
    paddingVertical: 5
  },
  answer: {
    paddingHorizontal: 5,
    width: "30%",
    alignItems: "center",
    justifyContent: 'center'
  },
  probContainer: {
    borderLeftWidth:1,
    height: 40,
    width: "65%",
    flexDirection: 'row',
    alignItems: 'center'
  },
  prob: {
    height: '70%',
    marginRight: 5,
    backgroundColor: Colors.mainColor
  }
});

export default AnswerList;
