import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";

import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import HomeNavigator from "./Home";
import ParkNavigator from "./Park";

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
        options={{ title: "Главная", tabBarIcon: ({ color }) => <Ionicons name="ios-home" color={color} size={22} /> }}
      />
      <Tab.Screen
        name="ServicesNavigator"
        component={Chat}
        options={{ title: "Работы", tabBarIcon: ({ color }) => <MaterialCommunityIcons name="wrench" color={color} size={22} /> }}
      />
      <Tab.Screen
        name="GarageNavigator"
        component={Chat}
        options={{ title: "Гараж", tabBarIcon: ({ color }) => <Ionicons name="car" color={color} size={28} /> }}
      />
      <Tab.Screen
        name="ParkNavigator"
        component={ParkNavigator}
        options={{ title: "Парк", tabBarIcon: ({ color }) => <MaterialIcons name="park" color={color} size={26} /> }}
      />
      <Tab.Screen
        name="ChatNavigator"
        component={Chat}
        options={{ title: "Чат", tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" color={color} size={24} /> }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={Profile}
        options={{ title: "Профиль", tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" color={color} size={22} /> }}
      />
    </Tab.Navigator>
  );
};

export default MainMavigator;
