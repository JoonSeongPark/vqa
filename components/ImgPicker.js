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
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

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
      quality: 0.8
    });

    setPickedImage(photo.uri);

    props.onImageTaken(photo.uri);
  };

  const takeImageHandler = async () => {
    const hasPermssion = await verifyPermissions();
    if (!hasPermssion) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7
    });
    setPickedImage(image.uri);

    props.onImageTaken(image.uri);
  };

  const { selectedImage} = props

  useEffect(()=>{
    setPickedImage(selectedImage)
  }, [selectedImage])

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View>
      {!pickedImage ? (
        <View style={styles.imageArea}>
          <DefaultText style={{ fontSize: 18 }}>
            등록된 이미지가 없습니다.
          </DefaultText>
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

      <View style={styles.buttons}>
        <View style={{ width: "40%" }}>
          <Button
            title="사진"
            color={Colors.mainColor}
            onPress={takeImageHandler}
          />
        </View>
        <View style={{ width: "40%" }}>
          <Button
            title="카메라"
            color={Colors.mainColor}
            onPress={takePhotoHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageArea: {
    height: Dimensions.get("window").height * 0.35,
    paddingTop: 10,
    paddingBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
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
