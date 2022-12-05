import { StyleSheet } from "react-native";

import AddCar from "../components/AddCar";
import Car from "../components/Car";
import Screen from "../components/Screen";
import { cars } from "../mocks";
import globalStyles from "../styles";

const GarageScreen = ({ navigation, modal }) => {
  return (
    <Screen>
      {cars.map((car) => (
        <Car style={styles.car} {...car} />
      ))}
      <AddCar modal={modal} />
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
