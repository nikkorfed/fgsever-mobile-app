import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

export default Screen = ({ children }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.wrapper}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
