import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import AppointmentScreen from "../screens/Appointment";
import HomeScreen from "../screens/Home";
import MaintenanceCalculatorScreen from "../screens/MaintenanceCalculator";
import SearchPartsScreen from "../screens/SearchParts";
import UpgradeCalculatorScreen from "../screens/UpgradeCalculator";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLargeTitle: true, title: "Главная" }} />
      <Stack.Screen name="MaintenanceCalculator" component={MaintenanceCalculatorScreen} options={{ title: "Калькулятор ТО" }} />
      <Stack.Screen name="UpgradeCalculator" component={UpgradeCalculatorScreen} options={{ title: "Калькулятор дооснащения" }} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Записаться", presentation: "modal" }} />
      <Stack.Screen name="SearchParts" component={SearchPartsScreen} options={{ title: "Покупка запчастей" }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
