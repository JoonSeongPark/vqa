import React from "react";
import {
  View,
  StyleSheet,
  PixelRatio,
  Dimensions,
  Platform
} from "react-native";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

var defaultTitleFontSize = 24;
var defaultRadiusSize = 10;

if (PixelRatio.get() === 3) {
  defaultTitleFontSize = 21;
  defaultRadiusSize = 9;
} else if (PixelRatio.get() === 2) {
  defaultTitleFontSize = 18;
  defaultRadiusSize = 8;
} else if (PixelRatio.get() < 2) {
  defaultTitleFontSize = 15;
  defaultRadiusSize = 7;
}

const AnswerList = props => {
  return (
    <View>
      <View style={styles.resultLine}>
        <DefaultText style={styles.answer}>
          {props.result[0].answer}
        </DefaultText>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.barView,
              ...{
                width: props.result[0].prob + "%",
                borderTopRightRadius:
                  props.result[0].prob == 100 ? 5 : defaultRadiusSize,
                borderBottomRightRadius:
                  props.result[0].prob == 100 ? 5 : defaultRadiusSize
              }
            }}
          />
          <View style={styles.textPosition}>
            <DefaultText style={styles.probText}>
              {props.result[0].prob.toFixed(2) + " %"}
            </DefaultText>
          </View>
        </View>
      </View>
      <View style={styles.resultLine}>
        <DefaultText style={styles.answer}>
          {props.result[1].answer}
        </DefaultText>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.barView,
              ...{
                width: props.result[1].prob + "%",
                borderTopRightRadius:
                  props.result[1].prob == 100 ? 5 : defaultRadiusSize,
                borderBottomRightRadius:
                  props.result[1].prob == 100 ? 5 : defaultRadiusSize
              }
            }}
          />
          <View style={styles.textPosition}>
            <DefaultText style={styles.probText}>
              {props.result[1].prob.toFixed(2) + " %"}
            </DefaultText>
          </View>
        </View>
      </View>
      <View style={styles.resultLine}>
        <DefaultText style={styles.answer}>
          {props.result[2].answer}
        </DefaultText>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.barView,
              ...{
                width: props.result[2].prob + "%",
                borderTopRightRadius:
                  props.result[2].prob == 100 ? 5 : defaultRadiusSize,
                borderBottomRightRadius:
                  props.result[2].prob == 100 ? 5 : defaultRadiusSize
              }
            }}
          />
          <View style={styles.textPosition}>
            <DefaultText style={styles.probText}>
              {props.result[2].prob.toFixed(2) + " %"}
            </DefaultText>
          </View>
        </View>
      </View>
      <View style={styles.resultLine}>
        <DefaultText style={styles.answer}>
          {props.result[3].answer}
        </DefaultText>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.barView,
              ...{
                width: props.result[3].prob + "%",
                borderTopRightRadius:
                  props.result[3].prob == 100 ? 5 : defaultRadiusSize,
                borderBottomRightRadius:
                  props.result[3].prob == 100 ? 5 : defaultRadiusSize
              }
            }}
          />
          <View style={styles.textPosition}>
            <DefaultText style={styles.probText}>
              {props.result[3].prob.toFixed(2) + " %"}
            </DefaultText>
          </View>
        </View>
      </View>
      <View style={styles.resultLine}>
        <DefaultText style={styles.answer}>
          {props.result[4].answer}
        </DefaultText>
        <View style={styles.barContainer}>
          <View
            style={{
              ...styles.barView,
              ...{
                width: props.result[4].prob + "%",
                borderTopRightRadius:
                  props.result[4].prob == 140 ? 5 : defaultRadiusSize,
                borderBottomRightRadius:
                  props.result[4].prob == 100 ? 5 : defaultRadiusSize
              }
            }}
          />
          <View style={styles.textPosition}>
            <DefaultText style={styles.probText}>
              {props.result[4].prob.toFixed(2) + " %"}
            </DefaultText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultLine: {
    paddingVertical: 5
  },
  answer: {
    fontSize: defaultTitleFontSize,
    paddingHorizontal: Dimensions.get("window").width * 0.015,
    paddingVertical: Dimensions.get("window").height * 0.005
  },
  barContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.03,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden"
  },
  barView: {
    backgroundColor: Colors.blueColor,
    height: "100%"
  },
  textPosition: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },
  probText: {}
});

export default AnswerList;
