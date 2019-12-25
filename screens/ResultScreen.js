import React, { useState, useEffect } from "react";
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
import Splitter from "../components/Splitter";
import AnswerList from "../components/AnswerList";
import Credits from "../components/Credits";

var defaultHeaderFontSize = 28;
var defaultTitleFontSize = 30;
var defaultExplainFontSize = 16;

if (PixelRatio.get() === 3) {
  defaultHeaderFontSize = 25;
  defaultTitleFontSize = 26;
  defaultExplainFontSize = 14;
} else if (PixelRatio.get() === 2) {
  defaultHeaderFontSize = 22;
  defaultTitleFontSize = 22;
  defaultExplainFontSize = 12;
} else if (PixelRatio.get() < 2) {
  defaultHeaderFontSize = 19;
  defaultTitleFontSize = 18;
  defaultExplainFontSize = 10;
}

const ResultScreen = props => {
  const [question, setQuestion] = useState("");
  const [apiResult, setApiResult] = useState([]);
  const [haveResult, setHaveResult] = useState(false);
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
    if (question === "") {
      setQuestion("What is this?");
    }
    file.append("question", question);

    fetch("http://35.229.162.86:5000/upload", {
      method: "POST",
      body: file
    })
      .then(response => response.json())
      .then(responseJson => {
        setApiResult(responseJson);
        setHaveResult(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // const loadedSamples = [];

  // useEffect(() => {
  //   fetch("http://35.229.162.86:5000/get_image_pathes")
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       return responseJson.image_pathes;
  //     })
  //     .then(samples => {
  //       setSampleList(samples);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  // if (loading) {
  // } else {
  //   for (const key in sampleList) {
  //     loadedSamples.push(
  //       new Images(new Date().toString() + key, sampleList[key])
  //     );
  //   }
  //   dispatch(sampleActions.addSamples(loadedSamples.id, loadedSamples.imageUrl))
  //   console.log(loadedSamples);
  // }

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
                style={{ fontSize: 10 }}
                color={Colors.mainColor}
                onPress={apiPostHandler}
              />
            </View>
          </View>
          {haveResult && <Splitter />}
          {haveResult && (
            <View style={styles.answerPart}>
              <DefaultText style={styles.partTitle}>Answer</DefaultText>
              <DefaultText style={styles.partExplanation}>
                : VQA 결과입니다.
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
    fontSize: defaultTitleFontSize,
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
  }
});

export default ResultScreen;
