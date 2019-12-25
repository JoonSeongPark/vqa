import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio
} from "react-native";

import { useDispatch } from "react-redux";

import * as imageActions from "../store/actions/image";

import Colors from "../constants/Colors";
import DefaultText from "../components/DefaultText";

var defaultFontSize = 16;

if (PixelRatio.get() === 3) {
  defaultFontSize = 14;
} else if (PixelRatio.get() === 2) {
  defaultFontSize = 12;
} else if (PixelRatio.get() < 2) {
  defaultFontSize = 10;
}

const OpeningScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace("Home");
    }, 1500);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imageActions.fetchImages());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <View></View>
      <View style={{ alignItems: "center", paddingBottom: 50 }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/vqa_logo_white.png")}
          />
        </View>
      </View>
      <View></View>
      <View style={{ height: Dimensions.get("window").height * 0.05 }}>
        <DefaultText style={styles.bottomText}>
          2019-2 YBIGTA CONFERENCE
        </DefaultText>
      </View>
    </View>
  );
};

OpeningScreen.navigationOptions = {
  headerTitle: null,
  headerStyle: {
    elevation: 0,
    backgroundColor: Colors.mainColor
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.mainColor
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.2,
    marginTop: 90
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  bottomText: {
    fontSize: defaultFontSize,
    fontWeight: "300",
    color: "white"
  }
});

export default OpeningScreen;
