import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import AppointmentScreen from "../screens/Appointment";
import WorkScreen from "../screens/Work";
import WorksScreen from "../screens/Works";

const Stack = createNativeStackNavigator();

const WorksNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Works" component={WorksScreen} options={{ headerLargeTitle: true, title: "Работы" }} />
      <Stack.Screen
        name="Work"
        component={WorkScreen}
        options={({ route }) => ({ title: `Заказ № ${route.params.workId}`, presentation: "modal" })}
      />
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Записаться", presentation: "modal" }} />
    </Stack.Navigator>
  );
};

export default WorksNavigator;
