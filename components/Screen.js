import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

export default Screen = ({ children }) => {
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
