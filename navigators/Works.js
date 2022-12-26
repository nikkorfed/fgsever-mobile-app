import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { stackNavigatorOptions } from "../config/stackNavigator";
import AppointmentScreen from "../screens/Appointment";
import WorkScreen from "../screens/Work";
import WorksScreen from "../screens/Works";
import styles from "../styles";

const Stack = createNativeStackNavigator();

const WorksNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Works" component={WorksScreen} options={{ headerLargeTitle: true, title: "Работы" }} />
      <Stack.Screen
        name="Work"
        component={WorkScreen}
        options={({ route, navigation }) => ({
          title: `Заказ-наряд № ${route.params.work.number}`,
          presentation: "modal",
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.goBack()}>
              <Text style={[styles.headerButton, { color: tintColor }]}>Закрыть</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={({ navigation }) => ({
          title: "Записаться",
          presentation: "modal",
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.goBack()}>
              <Text style={[styles.headerButton, { color: tintColor }]}>Закрыть</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default WorksNavigator;
