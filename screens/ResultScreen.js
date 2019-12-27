import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  KeyboardAvoidingView,
  PixelRatio,
  ActivityIndicator
} from "react-native";

import DefaultText from "../components/DefaultText";

import Colors from "../constants/Colors";
import Splitter from "../components/Splitter";
import AnswerList from "../components/AnswerList";
import Credits from "../components/Credits";
import ScreenTopPart from "../components/ScreenTopPart";

var defaultHeaderFontSize = 24;
var defaultTitleFontSize = 30;
var defaultExplainFontSize = 16;

if (PixelRatio.get() === 3) {
  defaultHeaderFontSize = 22;
  defaultTitleFontSize = 26;
  defaultExplainFontSize = 14;
} else if (PixelRatio.get() === 2) {
  defaultHeaderFontSize = 20;
  defaultTitleFontSize = 22;
  defaultExplainFontSize = 12;
} else if (PixelRatio.get() < 2) {
  defaultHeaderFontSize = 18;
  defaultTitleFontSize = 18;
  defaultExplainFontSize = 10;
}

const ResultScreen = props => {
  const [question, setQuestion] = useState("");
  const [apiResult, setApiResult] = useState([]);
  const [haveResult, setHaveResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const questionInputHandler = inputText => {
    setQuestion(inputText);
  };

  const imageId = props.navigation.getParam("imageId");
  const imageUrl = props.navigation.getParam("imageUrl");
  const currentImage = { id: imageId, imageUrl: imageUrl };

  const apiPostHandler = () => {
    const file = new FormData();
    file.append("photo", {
      uri: imageUrl,
      type: "image/jpeg",
      name: "photo.jpg"
    });
    file.append("question", question.toLowerCase().replace(/\?/g,''));

    fetch("http://34.80.51.170:5000/upload", {
      method: "POST",
      body: file
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(true);
        setApiResult(responseJson);
        setHaveResult(true);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <ScreenTopPart />

          <Splitter />

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

          <Splitter />

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
                style={{ fontSize: 10, color: Colors.mainColor }}
                color={Colors.blueColor}
                onPress={apiPostHandler}
              />
            </View>
          </View>
          {haveResult && <Splitter />}
          {haveResult && loading && (
            <View style={styles.actIndicator}>
              <ActivityIndicator size="large" color={Colors.blueColor} />
            </View>
          )}
          {haveResult && !loading && (
            <View style={styles.answerPart}>
              <DefaultText style={styles.partTitle}>Answer</DefaultText>
              <DefaultText style={styles.partExplanation}>
                : 예측된 결과의 정답과 신뢰도입니다. (Top 5)
              </DefaultText>
              <View style={styles.answerContainer}>
                <AnswerList result={apiResult} />
              </View>
            </View>
          )}

          <Splitter />

          <Credits />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ResultScreen.navigationOptions = naviData => {
  return {
    headerTitle: (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <DefaultText style={styles.topHeader}>VQA Result</DefaultText>
      </View>
    )
  };
};
const styles = StyleSheet.create({
  headerLogo: {
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.15,
    resizeMode: "contain"
  },
  topHeader: {
    color: Platform.OS === "android" ? "white" : Colors.mainColor,
    fontSize: defaultHeaderFontSize,
    fontWeight: "300"
  },
  header: {
    paddingTop: 10,
    alignItems: "center"
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
  partTitle: {
    paddingHorizontal: 10,
    fontSize: defaultTitleFontSize
  },
  partExplanation: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "gray",
    fontSize: defaultExplainFontSize
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
  },
  answerContainer: {
    marginHorizontal: 5
  },
  actIndicator: {
    margin: 5,
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 0.2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ResultScreen;
