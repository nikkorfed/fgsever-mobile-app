import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import api from "../api";
import Block from "../components/Block";
import { Button } from "../components/Button";
import Carousel from "../components/Carousel";
import DateTimePicker from "../components/DateTimePicker";
import Screen from "../components/Screen";
import Select from "../components/Select";
import { screenHorizontalPadding } from "../constants/paddings";
import { useStore } from "../hooks/store";
import { models, services } from "../mocks";
import globalStyles from "../styles";

const AppointmentScreen = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { cars } = useStore();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [car, setCar] = useState(cars[0]?.guid);
  const [service, setService] = useState();
  const [date, setDate] = useState();

  const handleSubmit = async () => {
    setLoading(true);

    const selectedCar = cars.find((item) => item.guid === car);
    const carData = selectedCar
      ? [
          ["Модель:", selectedCar.model],
          ["VIN:", selectedCar.vin],
          ["Обозначение кузова:", selectedCar.modelCode],
          ["Дата производства:", selectedCar.productionDate],
        ]
      : [["Модель:", models.find((item) => item.key === car).name]];
    const serviceData = services.find((item) => item.key === service).name;
    const data = { name, phone, car: carData, service: serviceData, date };

    await api.appointment(data);

    setLoading(false);
    setSuccess(true);
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  return (
    <Screen
      style={{ paddingHorizontal: 0 }}
      fixedBottom={<Button title={success ? "Готово" : "Отправить"} onPress={success ? handleBack : handleSubmit} />}
      fixedBottomStyle={{ paddingHorizontal: 20, bottom }}
      loading={loading}
    >
      {success && (
        <View style={styles.overlay}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="check" color="#333" size={40} />
          </View>
          <Text style={styles.title}>Заявка отправлена</Text>
          <Text style={styles.description}>
            Ваша заявка отправлена. Наш менеджер перезвонит вам в рабочее время (9:00 — 20:00) для уточнения деталей и записи на ремонт.
          </Text>
        </View>
      )}
      <View style={{ paddingHorizontal: screenHorizontalPadding }}>
        <Text style={styles.intro}>
          Укажите свои контакты, выберите автомобиль, необходимый вид работ и дату посещения, чтобы записаться на ремонт
        </Text>
        <Text style={styles.title}>Ваше имя</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Фамилия, имя и отчество"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.title}>Телефон</Text>
        <MaskInput
          style={styles.input}
          value={phone}
          onFocus={() => !phone && setPhone("+7")}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          mask={["+", "7", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
          placeholder="+7 (900) 000-00-00"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.title}>Автомобиль</Text>
      </View>
      {cars.length > 0 ? (
        <Carousel>
          {cars.map((item) => (
            <Block
              key={item.key}
              style={styles.block}
              image={item.image}
              imageStyle={styles.blockImage}
              imageResizeMode="contain"
              title={item.name}
              descriptionStyle={styles.blockDescription}
              selected={item.guid === car}
              onPress={() => setCar(item.guid)}
            />
          ))}
        </Carousel>
      ) : (
        <View style={{ paddingHorizontal: screenHorizontalPadding }}>
          <Select style={styles.selectInput} items={models} value={car} onChange={setCar} placeholder="Выберите автомобиль" />
        </View>
      )}
      <View style={{ paddingHorizontal: screenHorizontalPadding }}>
        <Text style={styles.title}>Вид работ</Text>
        <Select style={styles.selectInput} items={services} value={service} onChange={setService} placeholder="Выберите услугу" />
        <Text style={styles.title}>Дата посещения</Text>
        <DateTimePicker style={styles.selectInput} value={date} onChange={setDate} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    padding: 15,
    backgroundColor: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: "#f8f8f8",
  },
  intro: {
    ...globalStyles.intro,
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 15,
  },
  description: {
    ...globalStyles.description,
    textAlign: "center",
  },
  text: {
    ...globalStyles.text,
    marginBottom: 15,
  },
  block: {
    marginBottom: 15,
    justifyContent: "flex-end",
    shadowRadius: 0,
    backgroundColor: "white",
  },
  blockImage: {
    margin: 5,
  },
  blockDescription: {
    marginTop: 0,
    marginBottom: -5,
  },
  input: {
    ...globalStyles.input,
    marginBottom: 15,
  },
  selectInput: {
    marginBottom: 15,
  },
});

export default AppointmentScreen;
