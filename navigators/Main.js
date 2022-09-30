import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "../navigators/Home";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default MainMavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Главная" component={HomeNavigator} />
      <Tab.Screen name="Профиль" component={Profile} />
    </Tab.Navigator>
  );
};
