import { View, Text, StyleSheet, TextInput } from "react-native";

import { Button } from "../components/Button";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const ParkScreen = () => {
  return (
    <Screen>
      <Text style={styles.introDescription}>Выберите необходимый дом, дату посещения и количество гостей</Text>
      <TextInput style={styles.input} placeholder="Дом" />
      <TextInput style={styles.input} placeholder="Дата" />
      <TextInput style={styles.input} placeholder="Количество гостей" />
      <Button style={styles.button} title="Забронировать" onPress={() => {}} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles.main,
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  row: {
    ...globalStyles.main.row,
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
  introDescription: {
    ...globalStyles.intro.description,
    paddingHorizontal: 6,
  },
  input: {
    ...globalStyles.main.input,
    marginTop: 15,
    // shadowOpacity: 0.05,
    // shadowOffset: { height: 0, width: 0 },
    // shadowRadius: 10,
  },
  button: {
    marginTop: 15,
  },
});

export default ParkScreen;
