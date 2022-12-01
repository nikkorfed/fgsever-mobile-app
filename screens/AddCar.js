import { StyleSheet, Text } from "react-native";

import { Button } from "../components/Button";
import Car from "../components/Car";
import Screen from "../components/Screen";
import { cars } from "../mocks";
import globalStyles from "../styles";

const GarageScreen = ({ navigation }) => {
  return (
    <Screen>
      <Text>Здесь можно будет добавить машину</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  car: {
    marginBottom: 15,
  },
});

export default GarageScreen;
