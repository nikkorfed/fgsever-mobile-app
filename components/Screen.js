import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { screenHorizontalPadding } from "../constants/paddings";
import { useKeyboardVisible } from "../hooks/keyboard";
import Spinner from "./Spinner";

// Этот вид прокрутки работает немного плавнее, но некорректно отображает колесо прокрутки и имеет лишний отступ при открытой клавиатуре.

const Screen = ({ style, loading, children, fixedBottom, fixedBottomStyle }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const headerHeight = useHeaderHeight();

  let paddingTop = style?.paddingTop ?? 0;
  Platform.OS === "android" && (paddingTop += headerHeight);

  return (
    <>
      <KeyboardAwareScrollView
        style={[styles.wrapper, style, { paddingTop }]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 49 }}
        scrollIndicatorInsets={{ bottom: 49 }}
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
