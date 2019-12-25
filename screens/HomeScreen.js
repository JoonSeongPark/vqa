import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  PixelRatio,
  Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DefaultText from "../components/DefaultText";
import SampleGridTile from "../components/SampleGridTile";
import Colors from "../constants/Colors";
import ImgPicker from "../components/ImgPicker";

import * as imageActions from "../store/actions/image";
import * as photoActions from "../store/actions/photo";
import SampleImages from "../components/SampleImages";

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

const HomeScreen = props => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const images = useSelector(state => state.image.images);
  const [sampleImages, setSampleImages] = useState([]);
  useEffect(() => {
    setSampleImages(images);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [setTimeout, setLoading]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(imageActions.fetchImages());
  // }, [dispatch]);

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
    dispatch(photoActions.addImage(selectedImage));
  };

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(testActions.fetchImages());
  // }, [dispatch]);

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
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Image
            style={styles.logoImage}
            source={require("../assets/images/vqa_title_blue.png")}
          />
          <DefaultText style={styles.headExplanation}>
            : 이미지에 대해 자연어로 묻고, 답을 얻어내는 모델
          </DefaultText>
        </View>
        <View style={styles.section}>
          <DefaultText style={styles.sectionTitle}>
            VQA on Sample Images
          </DefaultText>
          <DefaultText style={styles.sectionExplanation}>
            : VQA를 적용할 이미지를 선택하세요.
          </DefaultText>
          {loading && (
            <View style={styles.actIndicator}>
              <ActivityIndicator size="large" color={Colors.mainColor} />
            </View>
          )}
          {!loading && (
            <SampleImages
              sampleImages={sampleImages}
              navigation={props.navigation}
            />
          )}
        </View>
        <View style={styles.section}>
          <DefaultText style={styles.sectionTitle}>VQA on Your Own</DefaultText>
          <DefaultText style={styles.sectionExplanation}>
            : VQA를 적용할 이미지를 업로드하세요.
          </DefaultText>
          <ImgPicker
            onImageTaken={imageTakenHandler}
            onSelect={() => {
              props.navigation.navigate({
                routeName: "Result",
                params: {
                  imageUrl: selectedImage
                }
              });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: (
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <DefaultText style={styles.topHeader}>Model </DefaultText>
      </View>
    )
  };
};
const styles = StyleSheet.create({
  topHeader: {
    color: Platform.OS === "android" ? "white" : Colors.mainColor,
    fontSize: defaultHeaderFontSize,
    fontWeight: "300",
    paddingLeft: Platform.OS === "android" ? 20 : 0
  },
  screen: {
    flex: 1,
    paddingHorizontal: 15
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
  section: {
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5
  },
  sectionTitle: {
    paddingTop: 3,
    paddingHorizontal: 10,
    fontSize: defaultTitleFontSize,
    fontWeight: "bold"
  },
  sectionExplanation: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "gray",
    fontSize: defaultExplainFontSize
  },
  girdTile: {
    width: "50%",
    height: undefined,
    aspectRatio: 1 / 1,
    borderWidth: 1
  },
  actIndicator: {
    margin: 5,
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;
