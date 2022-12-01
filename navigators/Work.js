import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import AppointmentScreen from "../screens/Appointment";
import WorkScreen from "../screens/Work";
import WorkDetailsScreen from "../screens/WorkDetails";

const Stack = createNativeStackNavigator();

const WorkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Work" component={WorkScreen} options={{ headerLargeTitle: true, title: "Работы" }} />
      <Stack.Screen
        name="WorkDetails"
        component={WorkDetailsScreen}
        options={({ route }) => ({ title: `Заказ № ${route.params.workId}` })}
      />
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Записаться", presentation: "modal" }} />
    </Stack.Navigator>
  );
};

export default WorkNavigator;
