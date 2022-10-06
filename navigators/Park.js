import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import BookingScreen from "../screens/Booking";
import ParkScreen from "../screens/Park";

const Stack = createNativeStackNavigator();

const ParkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Park" component={ParkScreen} options={{ headerLargeTitle: true, title: "Парк" }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: "Ваше бронирование" }} />
    </Stack.Navigator>
  );
};

export default ParkNavigator;
