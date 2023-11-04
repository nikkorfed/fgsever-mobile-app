import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { useStore } from "../hooks/store";

const UpgradeCalculatorScreen = ({ navigation }) => {
  const { cars, car } = useStore();

  const vin = cars.find((item) => item.guid === car)?.vin;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: "https://fgsever.ru/mobile-upgrade-calculator" + (vin ? `?vin=${vin}` : "") }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UpgradeCalculatorScreen;
