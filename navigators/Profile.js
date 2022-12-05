import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import ProfileScreen from "../screens/Profile";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerLargeTitle: true, title: "Профиль" }} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
