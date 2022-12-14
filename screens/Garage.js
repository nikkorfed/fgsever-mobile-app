import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import AddCar from "../components/AddCar";
import Car from "../components/Car";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const GarageScreen = ({ navigation, modal }) => {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    setLoading(true);
    const carsStorage = JSON.parse(await AsyncStorage.getItem("cars")) ?? [];
    setCars(carsStorage);
    setLoading(false);
  };

  const updateCars = async () => {
    setLoading(true);
    await AsyncStorage.setItem("cars", JSON.stringify(cars));
    setLoading(false);
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    updateCars();
  }, [cars]);

  return (
    <Screen loading={loading}>
      {cars.map((car) => (
        <Car key={car.key} style={styles.car} {...car} />
      ))}
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
