import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";

import CarPicker from "../components/CarPicker";
import { stackNavigatorOptions } from "../config/stackNavigator";
import { useStore } from "../hooks/store";
import AppointmentScreen from "../screens/Appointment";
import HomeScreen from "../screens/Home";
import MaintenanceCalculatorScreen from "../screens/MaintenanceCalculator";
import SearchPartsScreen from "../screens/SearchParts";
import UpgradeCalculatorScreen from "../screens/UpgradeCalculator";
import styles from "../styles";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const { cars, car, setCar } = useStore();

  return (
    <Stack.Navigator screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerLargeTitle: true, title: "Главная" }} />
      <Stack.Screen
        name="MaintenanceCalculator"
        component={MaintenanceCalculatorScreen}
        options={{
          title: "Калькулятор ТО",
          headerTitle: ({ children }) => (
            <View>
              <Text style={styles.headerTitle}>{children}</Text>
              <CarPicker value={car} onChange={setCar}>
                {({ onPress }) => (
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={onPress}>
                    <Text style={styles.headerSubtitle}>{cars.find((item) => item.guid === car)?.name || "Выбрать автомобиль"}</Text>
                    <MaterialCommunityIcons name="chevron-down" color="#888" size={14} />
                  </TouchableOpacity>
                )}
              </CarPicker>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UpgradeCalculator"
        component={UpgradeCalculatorScreen}
        options={{
          title: "Калькулятор дооснащения",
          headerTitle: ({ children }) => (
            <View>
              <Text style={styles.headerTitle}>{children}</Text>
              <CarPicker value={car} onChange={setCar}>
                {({ onPress }) => (
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={onPress}>
                    <Text style={styles.headerSubtitle}>{cars.find((item) => item.guid === car)?.name || "Выбрать автомобиль"}</Text>
                    <MaterialCommunityIcons name="chevron-down" color="#888" size={14} />
                  </TouchableOpacity>
                )}
              </CarPicker>
            </View>
          ),
        }}
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
      <Stack.Screen name="SearchParts" component={SearchPartsScreen} options={{ title: "Покупка запчастей" }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
