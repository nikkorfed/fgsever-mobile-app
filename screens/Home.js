import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { Button } from "../components/Button";
import Screen from "../components/Screen";

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <TouchableOpacity style={styles.promo} activeOpacity={0.5} onPress={() => navigation.navigate("MaintenanceCalculator")}>
        <Text style={styles.promoTitle}>Добро пожаловать в FGSEVER!</Text>
        <Text style={styles.promoDescription}>
          Здесь вы можете рассчитать стоимость ТО или дооснащения, записаться на ремонт, заказать запчасти или посмотреть историю работ.
        </Text>
      </TouchableOpacity>
      <View style={styles.services}>
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.service} activeOpacity={0.5} onPress={() => navigation.navigate("MaintenanceCalculator")}>
            <FontAwesome5 name="calculator" color="dodgerblue" size={40} />
            <Text style={styles.serviceTitle}>Калькулятор ТО</Text>
            <Text style={styles.serviceDescription}>Рассчитать стоимость техобслуживания по VIN автомобиля</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.service} activeOpacity={0.5} onPress={() => navigation.navigate("UpgradeCalculator")}>
            <FontAwesome5 name="calculator" color="dodgerblue" size={40} />
            <Text style={styles.serviceTitle}>Калькулятор дооснащения</Text>
            <Text style={styles.serviceDescription}>Рассчитать стоимость дооснащения по VIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.appointment}>
        <View style={styles.appointmentRow}>
          <View style={styles.appointmentText}>
            <Text style={styles.appointmentTitle}>Запись на ремонт</Text>
            <Text style={styles.appointmentDescription}>Выберите автомобиль, необходимый вид работ и дату посещения</Text>
          </View>
          <View style={styles.appointmentIcon}>
            <MaterialCommunityIcons name="car-wrench" color="dodgerblue" size={50} />
          </View>
        </View>
        <Button style={styles.button} title="Записаться" onPress={() => navigation.navigate("Appointment")} />
      </View>
      <Button style={styles.button} title="Купить запчасти" onPress={() => navigation.navigate("Parts")} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  promo: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "rgba(28, 105, 212, 0.15)",
  },
  promoTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
  promoDescription: {
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
    color: "#888",
  },
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
  appointment: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  appointmentRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  appointmentText: {
    flexShrink: 1,
  },
  appointmentIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // height: 60,
    // width: 60,
    // backgroundColor: "#f8f8f8",
  },
  appointmentTitle: {
    marginBottom: 5,
    fontFamily: "Montserrat_600SemiBold",
    color: "#111",
  },
  appointmentDescription: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "#666",
  },
});

export default HomeScreen;
