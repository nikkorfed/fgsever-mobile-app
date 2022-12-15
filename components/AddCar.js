import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

import api from "../api";
import Modal from "../components/Modal";
import globalStyles from "../styles";
import { Button } from "./Button";

const AddCar = ({ modal, setCars }) => {
  const [name, setName] = useState();
  const [vin, setVin] = useState();

  const handleAddCar = async () => {
    const { guid } = await api.carGuid(vin);
    const { vin: fullVin, image, model, modelCode, productionDate } = await api.carInfo(vin);

    const car = { key: fullVin, guid, name, image, vin: fullVin, model, modelCode, productionDate };
    setCars((prev) => [...prev, car]);

    modal.close();
  };

  return (
    <Modal modal={modal} noButton>
      <Text style={styles.section}>Добавить автомобиль</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Название" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} value={vin} onChangeText={setVin} placeholder="VIN" placeholderTextColor="#aaa" />
      <Button title="Добавить" onPress={handleAddCar} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  section: {
    ...globalStyles.section,
    marginBottom: 15,
  },
  input: {
    ...globalStyles.input,
    marginBottom: 15,
  },
});

export default AddCar;
