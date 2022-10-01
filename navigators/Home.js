import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AppointmentScreen from "../screens/Appointment";
import HomeScreen from "../screens/Home";
import MaintenanceCalculatorScreen from "../screens/MaintenanceCalculator";
import UpgradeCalculatorScreen from "../screens/UpgradeCalculator";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTransparent: true, headerBlurEffect: "light", headerLargeStyle: { backgroundColor: "#f8f8f8" } }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLargeTitle: true, title: "Главная" }} />
      <Stack.Screen name="MaintenanceCalculator" component={MaintenanceCalculatorScreen} options={{ title: "Калькулятор ТО" }} />
      <Stack.Screen name="UpgradeCalculator" component={UpgradeCalculatorScreen} options={{ title: "Калькулятор дооснащения" }} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Записаться" }} />
      {/* <Stack.Screen name="Parts" /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
