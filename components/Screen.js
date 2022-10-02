import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useKeyboardVisible } from "../hooks/keyboard";

// Текущий вид прокрутки для текстовых полей корректно работает с полосой прокрутки, но имеет скачки.

const Screen = ({ children }) => {
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        style={styles.wrapper}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 0 : 49 }}
        scrollIndicatorInsets={{ bottom: isKeyboardVisible ? 0 : 49 }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
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
