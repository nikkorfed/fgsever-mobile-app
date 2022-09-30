import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import AppointmentScreen from "../screens/Appointment";

const Stack = createNativeStackNavigator();

export default HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerLargeTitle: true }}>
      <Stack.Screen name="Главная" component={HomeScreen} />
      {/* <Stack.Screen name="MaintenanceCalculator" />
      <Stack.Screen name="UpgradeCalculator" /> */}
      <Stack.Screen name="Записаться" component={AppointmentScreen} />
      {/* <Stack.Screen name="Parts" /> */}
    </Stack.Navigator>
  );
};
