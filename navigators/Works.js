import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Platform, View, Text, TouchableOpacity } from "react-native";

import { stackNavigatorOptions } from "../config/stackNavigator";
import AppointmentScreen from "../screens/Appointment";
import WorkScreen from "../screens/Work";
import WorksScreen from "../screens/Works";
import globalStyles from "../styles";

const Stack = createNativeStackNavigator();

const WorksNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Works" component={WorksScreen} options={{ headerLargeTitle: true, title: "Работы" }} />
      <Stack.Screen
        name="Work"
        component={WorkScreen}
        options={({ route, navigation }) => ({
          title: `Заказ-наряд`,
          presentation: "modal",
          headerLeft: ({ tintColor }) =>
            Platform.OS === "ios" ? (
              <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                <Text style={[styles.headerButton, { color: tintColor }]}>Закрыть</Text>
              </TouchableOpacity>
            ) : null,
          headerTitle: ({ children }) => (
            <View>
              <Text style={styles.headerTitle}>{children}</Text>
              {route.params.number && <Text style={styles.headerSubtitle}>№ {route.params.number}</Text>}
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={({ navigation }) => ({
          title: "Записаться",
          presentation: "modal",
          headerLeft: ({ tintColor }) =>
            Platform.OS === "ios" ? (
              <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                <Text style={[styles.headerButton, { color: tintColor }]}>Закрыть</Text>
              </TouchableOpacity>
            ) : null,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  headerTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textAlign: Platform.OS === "ios" ? "center" : "left",
  },
  headerSubtitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    textAlign: Platform.OS === "ios" ? "center" : "left",
    color: "#888",
  },
});

export default WorksNavigator;
