import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { stackNavigatorOptions } from "../config/stackNavigator";
import WorkScreen from "../screens/Work";

const Stack = createNativeStackNavigator();

const WorkNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Work" component={WorkScreen} options={{ headerLargeTitle: true, title: "Работы" }} />
      {/* <Stack.Screen name="WorkDetails" component={WorkDetailsScreen} options={{ title: "Заказ #123456" }} /> */}
    </Stack.Navigator>
  );
};

export default WorkNavigator;
