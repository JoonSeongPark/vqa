import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import ReduxThunk from "redux-thunk";
import { enableScreens } from "react-native-screens";

import VqaNavigator from "./navigation/VqaNavigator";

import imageReducer from "./store/reducers/image";
import photoReducer from "./store/reducers/photo";

enableScreens;

const rootReducer = combineReducers({
  image: imageReducer,
  photo: photoReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'vagrounded': require("./assets/fonts/vagrounded-regular.ttf"),
    "vagrounded-bold": require("./assets/fonts/vagrounded-bold.ttf"),
    'kakao': require("./assets/fonts/KakaoRegular.ttf")
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <VqaNavigator />
    </Provider>
  );
}
