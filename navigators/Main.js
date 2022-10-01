import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import HomeNavigator from "../navigators/Home";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default MainMavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ title: "Главная", tabBarIcon: ({ color }) => <Feather name="home" color={color} size={26} /> }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={Profile}
        options={{ title: "Профиль", tabBarIcon: ({ color }) => <Feather name="user" color={color} size={26} /> }}
      />
    </Tab.Navigator>
  );
};
