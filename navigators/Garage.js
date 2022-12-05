import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Pressable from "../components/Pressable";
import { stackNavigatorOptions } from "../config/stackNavigator";
import { useModal } from "../hooks/modal";
import GarageScreen from "../screens/Garage";

const Stack = createNativeStackNavigator();

const GarageNavigator = () => {
  const addCarModal = useModal();

  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen
        name="Garage"
        options={{
          headerLargeTitle: true,
          title: "Гараж",
          headerRight: () => (
            <Pressable style={{ padding: 5 }} onPress={addCarModal.open}>
              <FontAwesome5 name="plus-circle" color="dodgerblue" size={20} />
            </Pressable>
          ),
        }}
      >
        {(props) => <GarageScreen modal={addCarModal} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default GarageNavigator;
