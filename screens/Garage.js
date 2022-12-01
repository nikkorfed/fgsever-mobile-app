import { StyleSheet } from "react-native";

import { Button } from "../components/Button";
import Car from "../components/Car";
import Screen from "../components/Screen";
import { cars } from "../mocks";
import globalStyles from "../styles";

const GarageScreen = ({ navigation }) => {
  return (
    <Screen>
      {cars.map((car) => (
        <Car style={styles.car} {...car} />
      ))}
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
