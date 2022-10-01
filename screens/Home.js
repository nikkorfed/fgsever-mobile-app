import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// TODO: Настроить линтер, чтобы проверял пути импортов, переменные (чтобы подставлять их или выявлять случаи, когда они отсутствуют).
import Screen from "../components/Screen";
import { Button } from "../components/Button";

export default HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.services}>
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.service} activeOpacity={0.8} onPress={() => navigation.navigate("MaintenanceCalculator")}>
            <FontAwesome5 name="calculator" color="dodgerblue" size={40} />
            <Text style={styles.serviceText}>Калькулятор техобслуживания</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.service} activeOpacity={0.8} onPress={() => navigation.navigate("UpgradeCalculator")}>
            <FontAwesome5 name="calculator" color="dodgerblue" size={40} />
            <Text style={styles.serviceText}>Калькулятор дооснащения</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Калькулятор техобслуживания" onPress={() => navigation.navigate("MaintenanceCalculator")} />
      <Button title="Калькулятор дооснащения" onPress={() => navigation.navigate("UpgradeCalculator")} />
      <Button title="Записаться на ремонт" onPress={() => navigation.navigate("Appointment")} />
      <Button title="Купить запчасти" onPress={() => navigation.navigate("Parts")} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -7.5,
  },
  serviceContainer: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 7.5,
  },
  service: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    height: 150,
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  serviceText: {
    marginTop: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
