import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useKeyboardVisible } from "../hooks/keyboard";

// Этот вид прокрутки работает немного плавнее, но некорректно отображает колесо прокрутки и имеет лишний отступ при открытой клавиатуре.

const Screen = ({ style, children, fixedBottom }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <KeyboardAwareScrollView
        style={[styles.wrapper, style]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 49 }}
        scrollIndicatorInsets={{ bottom: 49 }}
      >
        {children}
      </KeyboardAwareScrollView>
      {fixedBottom && <View style={{ ...styles.fixedBottom, bottom: bottomTabBarHeight }}>{fixedBottom}</View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  fixedBottom: {
    position: "fixed",
    padding: 15,
  },
});

export default Screen;
