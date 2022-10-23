import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useKeyboardVisible } from "../hooks/keyboard";

// Этот вид прокрутки работает немного плавнее, но некорректно отображает колесо прокрутки и имеет лишний отступ при открытой клавиатуре.

const Screen = ({ style, children, fixedBottom, noWrapper }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const headerHeight = useHeaderHeight();

  const paddingHorizontal = style?.paddingHorizontal ?? styles.wrapper.paddingHorizontal;

  return (
    <>
      <KeyboardAwareScrollView
        style={[
          styles.wrapper,
          style,
          { paddingTop: Platform.OS === "android" ? headerHeight : 0, paddingHorizontal: noWrapper ? 0 : paddingHorizontal },
        ]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 49 }}
        scrollIndicatorInsets={{ bottom: 49 }}
      >
        {children}
      </KeyboardAwareScrollView>
      {fixedBottom && <View style={{ ...styles.fixedBottom, padding: paddingHorizontal, bottom: 0 }}>{fixedBottom}</View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: Dimensions.get("window").width > 400 ? 15 : 12,
    backgroundColor: "#f8f8f8",
  },
  fixedBottom: {
    position: "absolute",
    width: "100%",
    padding: Dimensions.get("window").width > 400 ? 15 : 12,
  },
});

export default Screen;
