import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import { Button } from "../components/Button";
import Pressable from "../components/Pressable";
import Screen from "../components/Screen";

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={[styles.block, styles.promo]}>
        <Text style={[styles.title, styles.promoTitle]}>Добро пожаловать в FGSEVER!</Text>
        <Text style={[styles.description, styles.promoDescription]}>
          Здесь вы можете рассчитать стоимость ТО или дооснащения, записаться на ремонт, заказать запчасти или посмотреть историю работ.
        </Text>
      </View>
      <View style={styles.services}>
        <View style={styles.serviceContainer}>
          <Pressable style={styles.block} onPress={() => navigation.navigate("MaintenanceCalculator")}>
            <FontAwesome5 style={styles.serviceIcon} name="calculator" color="dodgerblue" size={32} />
            <Text style={styles.title}>Калькулятор ТО</Text>
            <Text style={styles.description}>Рассчитать стоимость техобслуживания по VIN автомобиля</Text>
          </Pressable>
        </View>
        <View style={styles.serviceContainer}>
          <Pressable style={styles.block} onPress={() => navigation.navigate("UpgradeCalculator")}>
            <FontAwesome5 style={styles.serviceIcon} name="calculator" color="dodgerblue" size={32} />
            <Text style={styles.title}>Калькулятор дооснащения</Text>
            <Text style={styles.description}>Рассчитать стоимость дооснащения по VIN</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.block} onPress={() => navigation.navigate("Appointment")}>
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.title}>Запись на ремонт</Text>
            <Text style={styles.description}>Выберите автомобиль, необходимый вид работ и дату посещения</Text>
          </View>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="car-wrench" color="dodgerblue" size={40} />
          </View>
        </View>
        {/* <Button title="Записаться" onPress={() => navigation.navigate("Appointment")} /> */}
      </Pressable>
      <View style={styles.block}>
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.title}>Покупка запчастей</Text>
            <Text style={styles.description}>Введите номера запчастей, чтобы проверить их наличие и перейти к оформлению заказа</Text>
          </View>
          <View style={styles.icon}>
            <MaterialCommunityIcons name="cart" color="dodgerblue" size={40} />
          </View>
        </View>
        <TextInput style={styles.input} placeholder="Номера запчастей (через запятую)" />
        <Button title="Заказать запчасти" onPress={() => navigation.navigate("Parts")} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    flexShrink: 1,
  },
  title: {
    marginBottom: 5,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "#888",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 60,
    width: 60,
    backgroundColor: "#f8f8f8",
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    backgroundColor: "#f8f8f8",
  },
  promo: {
    backgroundColor: "rgba(28, 105, 212, 0.15)",
    shadowRadius: 0,
  },
  promoTitle: {
    fontSize: 16,
  },
  promoDescription: {
    fontSize: 14,
  },
  services: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: -7.5,
  },
  serviceContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 7.5,
  },
  serviceIcon: {
    marginBottom: 15,
  },
});

export default HomeScreen;
