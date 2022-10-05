import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import ParkScreen from "../screens/Park";

const Stack = createNativeStackNavigator();

const ParkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Park" component={ParkScreen} options={{ headerLargeTitle: true, title: "Парк" }} />
    </Stack.Navigator>
  );
};

export default ParkNavigator;
