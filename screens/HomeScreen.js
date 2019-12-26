import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
  PixelRatio,
  Dimensions
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";
import ImgPicker from "../components/ImgPicker";

import SampleImages from "../components/SampleImages";
import { TouchableOpacity } from "react-native-gesture-handler";
import Splitter from "../components/Splitter";
import Credits from "../components/Credits";

import * as imageActions from '../store/actions/image'
import * as photoActions from "../store/actions/photo";

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

const HomeScreen = props => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const images = useSelector(state => state.image.images);

  const [sampleImages, setSampleImages] = useState([]);

  useEffect(() => {
    setSampleImages(images);
  }, [images]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [setTimeout, setLoading]);

  const dispatch = useDispatch();

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
    dispatch(photoActions.addImage(selectedImage));

  };

  const sampleRefreshHandler = () => {
    dispatch(imageActions.fetchImages());
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };
  const imageResetHandler = () => {
    setSelectedImage("");
    dispatch(photoActions.addImage(selectedImage));
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
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

        <Splitter />

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end"
            }}
          >
            <View>
              <DefaultText style={styles.sectionTitle}>
                VQA on Sample Images
              </DefaultText>
              <DefaultText style={styles.sectionExplanation}>
                : VQA를 적용할 이미지를 선택하세요.
              </DefaultText>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={sampleRefreshHandler}
            >
              <Icon name="ios-refresh" size={24} />
            </TouchableOpacity>
          </View>
          {loading && (
            <View style={styles.actIndicator}>
              <ActivityIndicator size="large" color={Colors.blueColor} />
            </View>
          )}
          {!loading && (
            <SampleImages
              sampleImages={sampleImages}
              navigation={props.navigation}
            />
          )}
        </View>

        <Splitter />

        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end"
            }}
          >
            <View>
              <DefaultText style={styles.sectionTitle}>
                VQA on Your Own
              </DefaultText>
              <DefaultText style={styles.sectionExplanation}>
                : VQA를 적용할 이미지를 업로드하세요.
              </DefaultText>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={imageResetHandler}
            >
              <Icon name="ios-refresh" size={24} />
            </TouchableOpacity>
          </View>
          <ImgPicker
            onImageTaken={imageTakenHandler}
            selectedImage={selectedImage}
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

        <Splitter />

        <Credits />
      </View>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <DefaultText style={styles.topHeader}>
          Visual Question Answering
        </DefaultText>
      </View>
    )
  };
};
const styles = StyleSheet.create({
  topHeader: {
    color: Platform.OS === "android" ? "white" : Colors.mainColor,
    fontSize: defaultHeaderFontSize,
    fontWeight: "300",
    paddingLeft: Platform.OS === "android" ? 15 : 0
  },
  screen: {
    flex: 1,
    paddingHorizontal: 15
  },
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
  },
  sectionTitle: {
    paddingTop: 3,
    paddingHorizontal: 10,
    fontSize: defaultTitleFontSize
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
  },
  iconContainer: {
    alignItems: "center",
    padding: 12
  }
});

export default HomeScreen;
