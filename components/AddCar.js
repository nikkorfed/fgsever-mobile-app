import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

import Modal from "../components/Modal";
import { cars } from "../mocks";
import globalStyles from "../styles";
import { Button } from "./Button";

const AddCar = ({ modal }) => {
  const [name, setName] = useState();
  const [vin, setVin] = useState();

  const handleAddCar = () => {
    cars.push({
      id: cars[cars.length - 1].id,
      key: name?.toLowerCase().replace(/\s/g, "-"),
      label: name,
      image: "https://a.d-cd.net/zsAAAgAzGeA-960.jpg",
      licensePlate: "Е305КН123",
      vin: "W4C12345678231221",
    });
    modal.close();
  };

  return (
    <Modal modal={modal} noButton>
      <Text style={styles.section}>Добавить автомобиль</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Название" />
      <TextInput style={styles.input} value={vin} onChangeText={setVin} placeholder="VIN" />
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
