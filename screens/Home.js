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
            <Text style={styles.serviceTitle}>Калькулятор ТО</Text>
            <Text style={styles.serviceDescription}>Рассчитать стоимость техобслуживания по VIN автомобиля</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.service} activeOpacity={0.8} onPress={() => navigation.navigate("UpgradeCalculator")}>
            <FontAwesome5 name="calculator" color="dodgerblue" size={40} />
            <Text style={styles.serviceTitle}>Калькулятор дооснащения</Text>
            <Text style={styles.serviceDescription}>Рассчитать стоимость дооснащения по VIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button style={styles.button} title="Записаться на ремонт" onPress={() => navigation.navigate("Appointment")} />
      <Button style={styles.button} title="Купить запчасти" onPress={() => navigation.navigate("Parts")} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  services: {
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap",
    marginHorizontal: -7.5,
  },
  serviceContainer: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 7.5,
  },
  service: {
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  serviceTitle: {
    marginTop: 15,
    fontFamily: "Montserrat_600SemiBold",
    color: "#111",
  },
  serviceDescription: {
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "#666",
  },
  button: {
    marginBottom: 10,
  },
});
