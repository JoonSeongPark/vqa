import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import {useDispatch} from 'react-redux'

import * as imageActions from "../store/actions/image";

import Colors from "../constants/Colors";

const OpeningScreen = props => {
  useEffect(()=>{
    setTimeout(()=>{
      props.navigation.replace("Home")
    }, 1500)
  })
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(imageActions.fetchImages());
  }, [dispatch]);
  
  return (
    <View style={styles.screen}>
      <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>VQA</Text>
      <Text style={{fontSize: 12, color: 'white'}}> </Text>
      <Text style={{fontSize: 16, color: 'white', fontWeight: "200"}}>이미지에 질문하고,</Text>
      <Text style={{fontSize: 16, color: 'white', fontWeight:"200"}}>정답 맞추기!</Text>
    </View>
  )
}

OpeningScreen.navigationOptions = {
  headerTitle: null,
  headerStyle: {
    elevation: 0,
    backgroundColor: Colors.mainColor
  }
}

const styles = StyleSheet.create({
screen: {
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.mainColor
}
})

export default OpeningScreen