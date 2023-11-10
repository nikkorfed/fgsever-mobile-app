import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, StatusBar, StyleSheet, View, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Spinner from "./Spinner";
import { screenHorizontalPadding } from "../constants/paddings";

// Этот вид прокрутки работает немного плавнее, но некорректно отображает колесо прокрутки и имеет лишний отступ при открытой клавиатуре.

// Used only for Android
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT - WINDOW_HEIGHT;

const Screen = ({ style, loading, refreshControl, children, fixedBottom, fixedBottomStyle }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  const marginTop = style?.marginTop ?? 0;
  let paddingBottom = Platform.OS === "android" ? 30 : 0;
  Platform.OS === "android" && (paddingBottom += (NAVIGATION_BAR_HEIGHT > 0 ? NAVIGATION_BAR_HEIGHT : 0) + bottomTabBarHeight);
  fixedBottom && (paddingBottom += 60);

  return (
    <>
      <KeyboardAwareScrollView
        style={[styles.wrapper, style, { marginTop }]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom }}
        refreshControl={refreshControl}
      >
        {children}
      </KeyboardAwareScrollView>
      {fixedBottom && <View style={[styles.fixedBottom, fixedBottomStyle]}>{fixedBottom}</View>}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: screenHorizontalPadding,
    backgroundColor: "white",
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: screenHorizontalPadding,
  },
});

export default Screen;
