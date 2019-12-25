import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

const SampleGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridTile}>
      <TouchableCmp style={{flex:1}} onPress={props.onSelect}>
        <Image style={styles.sampleImage} source={{ uri: props.image }}  />
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridTile: {
    flex: 1,
    margin: 5,
    width: '100%',
    height: undefined,
    aspectRatio: 1/1,
    elevation: 2,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.26,
    shadowRadius: 10,
    overflow: 'hidden'
  },
  sampleImage: {
    width:'100%',
    height: '100%',
    resizeMode: 'stretch'
  }
});

export default SampleGridTile;
