import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// import ChatScreen from "../screens/Chat";
import GarageNavigator from "./Garage";
import HomeNavigator from "./Home";
// import ParkNavigator from "./Park";
// import ProfileNavigator from "./Profile";
import WorksNavigator from "./Works";

const Tab = createBottomTabNavigator();

const MainMavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ title: "Главная", tabBarIcon: ({ color }) => <Ionicons name="ios-home" color={color} size={22} /> }}
      />
      <Tab.Screen
        name="WorksNavigator"
        component={WorksNavigator}
        options={{ title: "Работы", tabBarIcon: ({ color }) => <MaterialCommunityIcons name="wrench" color={color} size={22} /> }}
      />
      <Tab.Screen
        name="GarageNavigator"
        component={GarageNavigator}
        options={{ title: "Гараж", tabBarIcon: ({ color }) => <Ionicons name="car" color={color} size={28} /> }}
      />
      {/* <Tab.Screen
        name="ChatNavigator"
        component={ChatScreen}
        options={{ title: "Чат", tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" color={color} size={24} /> }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{ title: "Профиль", tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" color={color} size={22} /> }}
      />
      <Tab.Screen
        name="ParkNavigator"
        component={ParkNavigator}
        options={{ title: "Парк", tabBarIcon: ({ color }) => <MaterialIcons name="park" color={color} size={26} /> }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainMavigator;
