import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "../navigators/Home";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default MainMavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
      <Tab.Screen name="ProfileNavigator" component={Profile} />
    </Tab.Navigator>
  );
};
