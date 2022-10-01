import React from "react";
import { StyleSheet, ScrollView } from "react-native";

const Screen = ({ children }) => {
  return (
    <ScrollView style={styles.wrapper} contentInsetAdjustmentBehavior="automatic">
      {children}
    </ScrollView>
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
