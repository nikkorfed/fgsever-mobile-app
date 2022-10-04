import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useKeyboardVisible } from "../hooks/keyboard";

// Этот вид прокрутки работает немного плавнее, но некорректно отображает колесо прокрутки и имеет лишний отступ при открытой клавиатуре.

const Screen = ({ children }) => {
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <KeyboardAwareScrollView
      style={styles.wrapper}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 49 }}
      scrollIndicatorInsets={{ bottom: 49 }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
  },
});

export default Screen;
