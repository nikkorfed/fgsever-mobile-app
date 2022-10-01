import React from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "../navigators/Home";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default MainMavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: "absolute" },
        tabBarBackground: () => <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />,
      }}
    >
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
