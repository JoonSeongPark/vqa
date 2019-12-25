import React from "react";
import { View, Linking, StyleSheet, PixelRatio } from "react-native";
import DefaultText from "./DefaultText";

var defaultTitleFontSize = 30;
var defaultExplainFontSize = 16;

if (PixelRatio.get() === 3) {
  defaultTitleFontSize = 26;
  defaultExplainFontSize = 14;
} else if (PixelRatio.get() === 2) {
  defaultTitleFontSize = 22;
  defaultExplainFontSize = 12;
} else if (PixelRatio.get() < 2) {
  defaultTitleFontSize = 18;
  defaultExplainFontSize = 10;
}

const Credits = props => {
  const githubLinkHandler = username => {
    Linking.openURL("http://github.com/" + username).catch(err =>
      console.error("Cannot load page", err)
    );
  };

  return (
    <View style={{ paddingBottom: 20 }}>
      <DefaultText style={styles.sectionTitle}>Credits</DefaultText>
      <View style={{ flexDirection: "row" }}>
        <DefaultText
          style={{
            ...styles.sectionExplanation,
            ...{ paddingHorizontal: 0, paddingLeft: 15 }
          }}
        >
          Built by{" "}
        </DefaultText>
        <DefaultText
          style={{
            ...styles.sectionExplanation,
            ...{ color: "blue", paddingHorizontal: 0 }
          }}
          onPress={() => githubLinkHandler("JoonSeongPark")}
        >
          @JoonSeongPark
        </DefaultText>
        <DefaultText
          style={{
            ...styles.sectionExplanation,
            ...{ paddingHorizontal: 0 }
          }}
        >
          {" "}
          &{" "}
        </DefaultText>
        <DefaultText
          style={{
            ...styles.sectionExplanation,
            ...{ color: "blue", paddingHorizontal: 0 }
          }}
          onPress={() => githubLinkHandler("om00839")}
        >
          @om00839
        </DefaultText>
        <DefaultText
          style={{
            ...styles.sectionExplanation,
            ...{ paddingHorizontal: 0 }
          }}
        >
          {" "}
          &{" "}
        </DefaultText>
        <DefaultText
          style={{
            ...styles.sectionExplanation,
            ...{ color: "blue", paddingHorizontal: 0 }
          }}
          onPress={() => githubLinkHandler("jw")}
        >
          @jw
        </DefaultText>
      </View>
      <DefaultText style={styles.sectionExplanation}>
        2019-2 YBIGTA CONFERENCE
      </DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default Credits;
