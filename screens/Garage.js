import { StyleSheet, Text } from "react-native";

import AddCar from "../components/AddCar";
import Car from "../components/Car";
import Screen from "../components/Screen";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const GarageScreen = ({ navigation, modal }) => {
  const { cars, setCars } = useStore();

  return (
    <Screen>
      {cars.length > 0 ? (
        cars.map((car) => <Car key={car.key} style={styles.car} {...car} />)
      ) : (
        <Text style={styles.description}>В гараже пока нет автомобилей. Добавьте их с помощью кнопки вверху.</Text>
      )}
      <AddCar modal={modal} setCars={setCars} />
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
