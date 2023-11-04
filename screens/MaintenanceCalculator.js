import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { useStore } from "../hooks/store";

const MaintenanceCalculatorScreen = ({ navigation }) => {
  const { cars, car, works } = useStore();

  const vin = cars.find((item) => item.guid === car)?.vin;
  const mileage = works.find((work) => work.car.guid === car)?.mileage;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: "https://fgsever.ru/mobile-calculator" + (vin && mileage ? `?vin=${vin}&mileage=${mileage}` : "") }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MaintenanceCalculatorScreen;
