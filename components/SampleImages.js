import React from "react";
import { View } from "react-native";
import SampleGridTile from "./SampleGridTile";

const SampleImages = props => {
  var loopCmpTop = [];
  var loopCmpBottom = [];
  var sampleImages = props.sampleImages;
  for (let i = 0; i < 2; i++) {
    loopCmpTop.push(
      <SampleGridTile
        key={i}
        image={sampleImages[i].imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Result",
            params: {
              imageId: sampleImages[i].id,
              imageUrl: sampleImages[i].imageUrl
            }
          });
        }}
      />
    );
    loopCmpBottom.push(
      <SampleGridTile
      key={i+2}
        image={sampleImages[i + 2].imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Result",
            params: {
              imageId: sampleImages[i + 2].id,
              imageUrl: sampleImages[i + 2].imageUrl
            }
          });
        }}
      />
    );
  }
  return (
    <View>
      <View style={{ paddingTop: 10, flexDirection: "row" }}>
        {loopCmpTop}
        {/* <SampleGridTile
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
        /> */}
      </View>
      <View style={{ paddingBottom: 10, flexDirection: "row" }}>
        {loopCmpBottom}
        {/* <SampleGridTile
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
        /> */}
      </View>
    </View>
  );
};

export default SampleImages;
