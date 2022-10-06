import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import RepairIcon from "../assets/icons/repair.svg";
import Suspension from "../assets/icons/suspension.svg";
import Block from "../components/Block";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <Block
        style={styles.intro}
        title="Добро пожаловать в FGSEVER!"
        titleStyle={styles.introTitle}
        description="Здесь вы можете рассчитать стоимость ТО или дооснащения, записаться на ремонт, заказать запчасти или посмотреть историю работ."
        descriptionStyle={styles.introDescription}
      />
      <View style={styles.columns}>
        <View style={styles.column}>
          <Block
            style={styles.block}
            onPress={() => navigation.navigate("MaintenanceCalculator")}
            icon={<FontAwesome5 name="calculator" color="dodgerblue" size={30} />}
            title="Калькулятор ТО"
            description="Рассчитать стоимость техобслуживания по VIN автомобиля"
          />
        </View>
        <View style={styles.column}>
          <Block
            style={styles.block}
            onPress={() => navigation.navigate("UpgradeCalculator")}
            icon={<FontAwesome5 name="calculator" color="dodgerblue" size={30} />}
            title="Калькулятор дооснащения"
            description="Рассчитать стоимость дооснащения по VIN"
          />
        </View>
      </View>
      <Block
        style={styles.block}
        onPress={() => navigation.navigate("Appointment")}
        title="Запись на ремонт"
        description="Выберите автомобиль, необходимый вид работ и дату посещения"
        sideIcon={<RepairIcon size={30} />}
        // buttons={<Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />}
      />
      <Block
        style={styles.block}
        title="Покупка запчастей"
        description="Введите номера запчастей, чтобы проверить их наличие и перейти к оформлению заказа"
        sideIcon={<Suspension size={30} />}
        buttons={
          <View>
            <TextInput style={styles.input} placeholder="Номера запчастей (через запятую)" />
            <Button style={styles.button} title="Заказать запчасти" onPress={() => navigation.navigate("Parts")} />
          </View>
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  intro: {
    marginBottom: 15,
    backgroundColor: "rgba(28, 105, 212, 0.10)",
    shadowRadius: 0,
  },
  introTitle: {
    fontSize: 16,
  },
  introDescription: {
    fontSize: 14,
  },
  block: {
    marginBottom: 15,
  },
  input: globalStyles.input,
  button: {
    marginTop: 15,
  },
});

export default HomeScreen;
