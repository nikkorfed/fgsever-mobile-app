import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const MaintenanceCalculatorScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: "https://fgsever.ru/mobile-calculator" }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MaintenanceCalculatorScreen;
