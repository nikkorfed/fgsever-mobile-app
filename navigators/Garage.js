import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Pressable from "../components/Pressable";
import { stackNavigatorOptions } from "../config/stackNavigator";
import AddCarScreen from "../screens/AddCar";
import GarageScreen from "../screens/Garage";

const Stack = createNativeStackNavigator();

const GarageNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen
        name="Garage"
        component={GarageScreen}
        options={{
          headerLargeTitle: true,
          title: "Гараж",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("AddCar")}>
              <FontAwesome5 name="plus-circle" color="dodgerblue" size={20} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: "Добавить автомобиль", presentation: "modal" }} />
    </Stack.Navigator>
  );
};

export default GarageNavigator;
