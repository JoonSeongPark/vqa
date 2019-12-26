import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

var defaultIconSize = Dimensions.get('window').width*0.16;
var defaultIconTextSize = 20;

if (PixelRatio.get() === 3) {
  defaultIconTextSize = 18;
} else if (PixelRatio.get() === 2) {
  defaultIconTextSize = 16;
} else if (PixelRatio.get() < 2) {
  defaultIconTextSize = 14;
}

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState("");

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "카메라 접근 허가",
        "VQA 이미지 등록을 위해서 카메라 접근 허가가 필요합니다."
      );
      return false;
    }
    return true;
  };
  const takePhotoHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const photo = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      quality: 0.7
    });
    // console.log(photo)
    setPickedImage(photo.uri);

    props.onImageTaken(photo.uri);
  };

  const takeImageHandler = async () => {
    const hasPermssion = await verifyPermissions();
    if (!hasPermssion) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "photo",
      quality: 0.7
    });

    setPickedImage(image.uri);

    props.onImageTaken(image.uri);
  };

  const { selectedImage } = props;

  useEffect(() => {
    setPickedImage(selectedImage);
  }, [selectedImage]);

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View>
      {!pickedImage ? (
        <View style={styles.imageArea}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={takeImageHandler}
            >
              <Icon name="ios-images" size={defaultIconSize*2/3} color="white" />
            </TouchableOpacity>
            <DefaultText style={styles.iconText}>앨범</DefaultText>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={takePhotoHandler}
            >
              <Icon name="ios-camera" size={defaultIconSize*2/3} color="white" />
            </TouchableOpacity>
            <DefaultText style={styles.iconText}>카메라</DefaultText>
          </View>
        </View>
      ) : (
        <View style={{ ...styles.imageArea, ...{ borderColor: "white" } }}>
          <View style={{ flex: 1, height: "100%", width: "100%" }}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
              <Image style={styles.image} source={{ uri: pickedImage }} />
            </TouchableCmp>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageArea: {
    height: Dimensions.get("window").height * 0.35,
    marginVertical: 15,
    paddingTop: 10,
    paddingBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  buttonContainer: {
    alignItems: "center"
  },
  iconContainer: {
    height: defaultIconSize,
    width: defaultIconSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (defaultIconSize * 1.5) / 2,
    backgroundColor: Colors.blueColor,
    marginTop:Dimensions.get('window').height*0.039,
    marginBottom:Dimensions.get('window').height*0.013
  },
  iconText: {
    fontSize: defaultIconTextSize,
    color: Colors.mainColor,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain"
  },
  buttons: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default ImgPicker;
