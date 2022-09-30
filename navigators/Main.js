import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from "../screens/Main";
import Profile from "../screens/Profile";

export default MainMavigator = function () {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Главная" component={Main} />
      <Tab.Screen name="Профиль" component={Profile} />
    </Tab.Navigator>
  );
};
