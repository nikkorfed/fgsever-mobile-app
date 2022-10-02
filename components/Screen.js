import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Screen = ({ children }) => {
  return (
    <KeyboardAwareScrollView style={styles.wrapper} contentInsetAdjustmentBehavior="automatic">
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
  },
});

export default Screen;
