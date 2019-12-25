import React from "react";
import { View, StyleSheet } from "react-native";
import SampleGridTile from "./SampleGridTile";



const SampleImages = props => {
  return (
    <View>
      <View style={{ paddingTop: 10, flexDirection: "row" }}>
        <SampleGridTile
          image={props.sampleImages[0].imageUrl}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "Result",
              params: {
                imageId: props.sampleImages[0].id,
                imageUrl: props.sampleImages[0].imageUrl
              }
            });
          }}
        />
        <SampleGridTile
          image={props.sampleImages[1].imageUrl}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "Result",
              params: {
                imageId: props.sampleImages[1].id,
                imageUrl: props.sampleImages[1].imageUrl
              }
            });
          }}
        />
      </View>
      <View style={{ paddingBottom: 10, flexDirection: "row" }}>
        <SampleGridTile
          image={props.sampleImages[2].imageUrl}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "Result",
              params: {
                imageId: props.sampleImages[2].id,
                imageUrl: props.sampleImages[2].imageUrl
              }
            });
          }}
        />
        <SampleGridTile
          image={props.sampleImages[3].imageUrl}
          onSelect={() => {
            props.navigation.navigate({
              routeName: "Result",
              params: {
                imageId: props.sampleImages[3].id,
                imageUrl: props.sampleImages[3].imageUrl
              }
            });
          }}
        />
      </View>
    </View>
  );
};

export default SampleImages;
