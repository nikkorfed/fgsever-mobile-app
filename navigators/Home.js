import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import AppointmentScreen from "../screens/Appointment";

const Stack = createNativeStackNavigator();

export default HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTransparent: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLargeTitle: true, title: "Главная" }} />
      {/* <Stack.Screen name="MaintenanceCalculator" />
      <Stack.Screen name="UpgradeCalculator" /> */}
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Записаться" }} />
      {/* <Stack.Screen name="Parts" /> */}
    </Stack.Navigator>
  );
};
