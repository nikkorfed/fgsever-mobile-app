import { View, Text, StyleSheet, TextInput } from "react-native";

import { Button } from "../components/Button";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const ParkScreen = () => {
  return (
    <Screen>
      <Text style={styles.intro}>Выберите необходимый дом, дату посещения и количество гостей</Text>
      <TextInput style={styles.input} placeholder="Дом" />
      <TextInput style={styles.input} placeholder="Дата" />
      <TextInput style={styles.input} placeholder="Количество гостей" />
      <Button style={styles.button} title="Забронировать" onPress={() => {}} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  row: {
    ...globalStyles.row,
    justifyContent: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: "100%",
    height: 80,
    width: 80,
    backgroundColor: "#f8f8f8",
  },
  intro: {
    ...globalStyles.intro,
    paddingHorizontal: 6,
  },
  input: {
    ...globalStyles.input,
    marginTop: 15,
  },
  button: {
    marginTop: 15,
  },
});

export default ParkScreen;
