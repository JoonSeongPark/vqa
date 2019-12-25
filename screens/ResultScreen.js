import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  KeyboardAvoidingView,
  Alert,
  PixelRatio
} from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

import Colors from "../constants/Colors";

var defaultHeaderFontSize = 28
var defaultTitleFontSize = 30;
var defaultExplainFontSize = 16;

if (PixelRatio.get() === 3) {
  defaultHeaderFontSize = 25
  defaultTitleFontSize = 26;
  defaultExplainFontSize = 14;
} else if (PixelRatio.get() === 2) {
  defaultHeaderFontSize = 22
  defaultTitleFontSize = 22;
  defaultExplainFontSize = 12;
} else if (PixelRatio.get() < 2) {
  defaultHeaderFontSize = 19
  defaultTitleFontSize = 18;
  defaultExplainFontSize = 10;
}



const ResultScreen = props => {
  const [question, setQuestion] = useState("");
  const questionInputHandler = inputText => {
    setQuestion(inputText);
  };

  const imageId = props.navigation.getParam("imageId");
  const imageUrl = props.navigation.getParam('imageUrl')
  const currentImage = {id:imageId, imageUrl: imageUrl}
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.header}>
          <Image
            style={styles.logoImage}
            source={require("../assets/images/vqa_title_blue.png")}
          />
          <DefaultText style={styles.headExplanation}>
            : 이미지에 대해 자연어로 묻고, 답을 얻어내는 모델
          </DefaultText>
        </View>
          <View style={styles.imagePart}>
            <DefaultText style={styles.partTitle}>Image</DefaultText>
            <DefaultText style={styles.partExplanation}>
              : 선택한 이미지입니다.
            </DefaultText>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: currentImage.imageUrl }}
              />
            </View>
          </View>
          <View style={styles.questionPart}>
            <DefaultText style={styles.partTitle}>Question</DefaultText>
            <DefaultText style={styles.partExplanation}>
              : 이미지와 관련된 질문을 입력하세요.
            </DefaultText>
            <View style={styles.questionContainer}>
              <TextInput
                placeholder="Enter your question"
                value={question}
                onChangeText={questionInputHandler}
                style={styles.input}
              />
              <Button
                title="Submit"
                style={{fontSize:10}}
                color={Colors.mainColor}
                onPress={() => {
                  if (question === "") {
                    Alert.alert(
                      "입력된 내용이 없습니다 !",
                      "질문을 입력해주세요."
                    );
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.answerPart}>
            <DefaultText style={styles.partTitle}>Answer</DefaultText>
            <DefaultText style={styles.partExplanation}>
              : VQA 결과입니다.
            </DefaultText>
            <View style={styles.answerContainer}></View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ResultScreen.navigationOptions = naviData => {
  return {
    headerTitle: <Text style={styles.topHeader}>VQA Result</Text>
  };
};
const styles = StyleSheet.create({
  topHeader: {
    color: Platform.OS === "android" ? "white" : Colors.mainColor,
    fontSize: defaultHeaderFontSize,
    fontWeight: "300"
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5
  },
  logoImage: {
    height: Dimensions.get("window").height * 0.08,
    width: Dimensions.get("window").width * 0.75,
    resizeMode: "contain"
  },
  headExplanation: {
    fontSize: defaultExplainFontSize,
    color: "gray",
    paddingBottom: Dimensions.get("window").height * 0.002
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: Colors.mainColor
  },
  partTitle: {
    paddingTop: 13,
    paddingHorizontal: 10,
    fontSize: defaultTitleFontSize,
    fontWeight: "bold"
  },
  partExplanation: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "gray",
    fontSize: defaultExplainFontSize
  },
  imagePart: {
    paddingBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5
  },
  imageContainer: {
    height: Dimensions.get("window").height * 0.35,
    paddingTop: 10,
    paddingBottom: 20
  },
  image: {
    height: "100%",
    resizeMode: "contain"
  },
  questionPart: {
    paddingBottom: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5
  },
  questionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  input: {
    paddingHorizontal: 7,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "75%"
  }
});

export default ResultScreen;
