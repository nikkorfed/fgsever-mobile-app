import { StyleSheet, View, Text } from "react-native";

import TickIcon from "../assets/icons/tick.svg";
import Block from "../components/Block";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const BookingScreen = () => {
  return (
    <Screen fixedBottom={<Button title="Открыть дом" />}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <TickIcon size={30} />
        </View>
        <Text style={styles.intro}>Для вас забронирован дом на территории парка. Ждем вас!</Text>
      </View>
      <Text style={styles.title}>Дом</Text>
      <Block
        style={styles.block}
        title="Приморский дом"
        image="https://dizajn-interera.ru-land.com/sites/default/files/i/32419/4-11/646d958f7b8f.jpg"
      />
      <Text style={styles.title}>Как доехать</Text>
      <View style={styles.map}>
        <Text>Здесь будет карта</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    height: 250,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: "100%",
    height: 100,
    width: 100,
    backgroundColor: "#f8f8f8",
  },
  intro: {
    ...globalStyles.title,
    textAlign: "center",
  },
  title: {
    ...globalStyles.title,
    marginBottom: 15,
  },
  block: {
    marginBottom: 15,
    height: 150,
  },
  map: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 100,
    backgroundColor: "lightgreen",
  },
});

export default BookingScreen;
