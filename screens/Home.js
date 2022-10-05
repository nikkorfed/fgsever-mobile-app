import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

import { Button } from "../components/Button";
import Pressable from "../components/Pressable";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.intro}>
        <Text style={styles.introTitle}>Добро пожаловать в FGSEVER!</Text>
        <Text style={styles.introDescription}>
          Здесь вы можете рассчитать стоимость ТО или дооснащения, записаться на ремонт, заказать запчасти или посмотреть историю работ.
        </Text>
      </View>
      <View style={styles.columns}>
        <View style={styles.column}>
          <Pressable style={styles.block} onPress={() => navigation.navigate("MaintenanceCalculator")}>
            <FontAwesome5 style={styles.blockIcon} name="calculator" color="dodgerblue" size={30} />
            <Text style={styles.title}>Калькулятор ТО</Text>
            <Text style={styles.description}>Рассчитать стоимость техобслуживания по VIN автомобиля</Text>
          </Pressable>
        </View>
        <View style={styles.column}>
          <Pressable style={styles.block} onPress={() => navigation.navigate("UpgradeCalculator")}>
            <FontAwesome5 style={styles.blockIcon} name="calculator" color="dodgerblue" size={30} />
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
          <View style={styles.sideIcon}>
            <MaterialCommunityIcons name="car-wrench" color="dodgerblue" size={34} />
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
          <View style={styles.sideIcon}>
            <MaterialCommunityIcons name="cart" color="dodgerblue" size={30} />
          </View>
        </View>
        <TextInput style={styles.input} placeholder="Номера запчастей (через запятую)" />
        <Button style={styles.button} title="Заказать запчасти" onPress={() => navigation.navigate("Parts")} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles.main,
  intro: {
    ...globalStyles.main.block,
    backgroundColor: "rgba(28, 105, 212, 0.10)",
    shadowRadius: 0,
  },
  introTitle: globalStyles.intro.title,
  introDescription: globalStyles.intro.description,
  input: {
    ...globalStyles.main.input,
    marginTop: 15,
  },
  button: {
    marginTop: 15,
  },
});

export default HomeScreen;
