import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Colors from "../constants/Colors";

const OpeningScreen = props => {
  useEffect(()=>{
    setTimeout(()=>{
      props.navigation.replace("Home")
    }, 1500)
  })
  return (
    <View>
      <Text>VQA</Text>
      <Text>이미지에 질문하고, 정답 맞추기!</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default OpeningScreen