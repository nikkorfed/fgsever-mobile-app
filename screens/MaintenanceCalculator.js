import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default MaintenanceCalculatorScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: "https://fgsever.ru/calculator" }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
