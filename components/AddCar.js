import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput } from "react-native";
import { compareTwoStrings as similarity } from "string-similarity";

import api from "../api";
import Modal from "../components/Modal";
import { useModal } from "../hooks/modal";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";
import { Button } from "./Button";

const AddCar = ({ modal, setCars }) => {
  const { pushToken } = useStore();

  // const [name, setName] = useState();
  const [vin, setVin] = useState();
  const [customer, setCustomer] = useState();

  const customerNameModal = useModal();

  const handleNextStep = async () => {
    await modal.confirm();
    await customerNameModal.open();
  };

  const handleAddCar = async () => {
    const { guid, vin: fullVin, name } = await api.carGuid(vin);

    const customers = await api.carCustomers(guid);
    const customerNames = customers.map((customer) => customer.name.trim().toLowerCase());
    // console.log("Владельцы", customerNames);

    const customerGuessed = customerNames.some((name) => similarity(name.trim().toLowerCase(), customer.trim().toLowerCase()) >= 0.8);
    if (!customerGuessed) {
      setCustomer();
      return Alert.alert("Неверные данные владельца", "Пожалуйста, попробуйте заново ввести полное имя владельца автомобиля.");
    }

    setCars((prev) => [...prev, { key: fullVin, guid, name, vin: fullVin }]);

    if (pushToken) {
      const existingTokens = await api.getPushTokens(guid);
      const tokenExists = existingTokens.some(({ token }) => token === pushToken);
      if (!tokenExists) await api.addPushToken(guid, pushToken);
    }

    Alert.alert("Автомобиль добавлен", "Ваш автомобиль был успешно добавлен в гараж.");
    customerNameModal.confirm();
    // setName();
    setVin();
    setCustomer();
  };

  return (
    <>
      <Modal modal={modal} noButton>
        <Text style={styles.sectionTitle}>Добавить автомобиль</Text>
        {/* <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Название" placeholderTextColor="#aaa" /> */}
        <TextInput style={styles.input} value={vin} onChangeText={setVin} placeholder="VIN" placeholderTextColor="#aaa" />
        <Button title="Далее" onPress={handleNextStep} />
      </Modal>
      <Modal modal={customerNameModal} noButton>
        <Text style={styles.sectionTitle}>Введите ФИО владельца</Text>
        <Text style={styles.description}>Полное имя владельца, как в карточке СТС. Для юридических лиц — наименование юрлица.</Text>
        <TextInput
          style={styles.input}
          value={customer}
          onChangeText={setCustomer}
          placeholder="Фамилия, имя и отчество"
          placeholderTextColor="#aaa"
        />
        <Button title="Добавить" onPress={handleAddCar} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  sectionTitle: {
    ...globalStyles.sectionTitle,
    marginBottom: 15,
  },
  description: {
    ...globalStyles.description,
    marginTop: -10,
    marginBottom: 15,
  },
  input: {
    ...globalStyles.input,
    marginBottom: 15,
  },
});

export default AddCar;
