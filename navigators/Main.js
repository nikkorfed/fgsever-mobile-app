import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";

import HomeNavigator from "../navigators/Home";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const MainMavigator = () => {
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
        name="ChatNavigator"
        m
        component={Chat}
        options={{ title: "Чат", tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" color={color} size={26} /> }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={Profile}
        options={{ title: "Профиль", tabBarIcon: ({ color }) => <Feather name="user" color={color} size={26} /> }}
      />
    </Tab.Navigator>
  );
};

export default MainMavigator;
