import React from "react";
import { View, Image, StyleSheet, Dimensions, PixelRatio } from "react-native";

import DefaultText from "./DefaultText";

import Colors from '../constants/Colors'

var defaultTitleFontSize = 30;
var defaultExplainFontSize = 16;

if (PixelRatio.get() === 3) {
  defaultTitleFontSize = 26;
  defaultExplainFontSize = 14;
} else if (PixelRatio.get() === 2) {
  defaultTitleFontSize = 22;
  defaultExplainFontSize = 12;
} else if (PixelRatio.get() < 2) {
  defaultTitleFontSize = 18;
  defaultExplainFontSize = 10;
}


const ScreenTopPart = props => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.logoImage}
        source={require("../assets/images/vqa_logo_image.png")}
      />

      <DefaultText
        style={{
          paddingBottom: 10,
          fontSize: defaultTitleFontSize,
          color: Colors.blueColor
        }}
      >
        VQA
      </DefaultText>
      <DefaultText style={styles.headExplanation}>
        : 이미지에 대해 자연어로 묻고, 답을 얻어내는 모델
      </DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center"
  },
  logoImage: {
    height: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width * 0.75,
    resizeMode: "contain",
    marginTop: 15,
    marginBottom: 5
  },
  headExplanation: {
    fontSize: defaultExplainFontSize,
    color: "gray"
    // paddingBottom: Dimensions.get("window").height * 0.002
  }
});

export default ScreenTopPart;
