import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput } from "react-native";
import { compareTwoStrings as similarity } from "string-similarity";

import api from "../api";
import { Button } from "../components/Button";
import Modal from "../components/Modal";
import { useModal } from "../hooks/modal";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const AddCar = ({ modal, setCars }) => {
  const { pushToken } = useStore();

  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState();
  const [vin, setVin] = useState();
  const [customer, setCustomer] = useState();

  const customerNameModal = useModal();

  const handleNextStep = async () => {
    await modal.confirm();
    await customerNameModal.open();
  };

  const handleAddCar = async () => {
    setLoading(true);

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
      const [existingPushToken] = await api.getPushTokens({ token: pushToken, type: "car", refGuid: guid });
      if (!existingPushToken) await api.addPushToken({ token: pushToken, type: "car", refGuid: guid });
    }

    Alert.alert("Автомобиль добавлен", "Ваш автомобиль был успешно добавлен в гараж.");
    customerNameModal.confirm();
    // setName();
    setVin();
    setCustomer();
    setLoading(false);
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
        <Button title="Добавить" loading={loading} onPress={handleAddCar} />
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
