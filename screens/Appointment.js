import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Block from "../components/Block";
import { Button } from "../components/Button";
import Carousel from "../components/Carousel";
import DateTimePicker from "../components/DateTimePicker";
import Screen from "../components/Screen";
import Select from "../components/Select";
import globalStyles from "../styles";

const cars = [
  {
    id: 1,
    key: "5-series",
    title: "BMW 5",
    image: "https://fgsever.ru/images/models/5-series/g30.png",
    licensePlate: "А001АА799",
  },
  {
    id: 2,
    key: "x7",
    title: "BMW X7",
    image: "https://fgsever.ru/images/models/x7/g07.png",
    licensePlate: "А002АА799",
  },
  {
    id: 3,
    key: "m8",
    title: "BMW M8",
    image: "https://fgsever.ru/images/models/8-series/g15.png",
    licensePlate: "А002АА799",
  },
];

const services = [
  { id: 1, key: "maintenance", title: "Техническое обслуживание" },
  { id: 2, key: "upgrade", title: "Дооснащение" },
  { id: 3, key: "repair", title: "Ремонт" },
  { id: 4, key: "update", title: "Обновление ПО" },
  { id: 5, key: "coding", title: "Кодирование" },
];

const AppointmentScreen = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();

  const [car, setCar] = useState();
  const [service, setService] = useState();
  const [date, setDate] = useState();

  return (
    <Screen
      style={{ paddingHorizontal: 0, backgroundColor: "white" }}
      fixedBottom={<Button title="Далее" onPress={() => navigation.navigate("Booking")} />}
      fixedBottomStyle={{ paddingHorizontal: 20, paddingBottom: bottom }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.intro}>Выберите автомобиль, необходимый вид работ и дату посещения, чтобы записаться на ремонт</Text>
        <Text style={styles.title}>Клиент</Text>
        <Text style={styles.text}>Иванов Иван Иванович</Text>
        <Text style={styles.title}>Автомобиль</Text>
      </View>
      <Carousel>
        {cars.map((item) => (
          <Block
            key={item.key}
            style={styles.block}
            image={item.image}
            imageStyle={styles.blockImage}
            imageResizeMode="contain"
            title={item.title}
            description={item.description}
            selected={item.key === car}
            onPress={() => setCar(item.key)}
          />
        ))}
      </Carousel>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>Вид работ</Text>
        <Select style={styles.input} items={services} value={service} onChange={setService} placeholder="Выберите услугу" />
        <Text style={styles.title}>Дата посещения</Text>
        <DateTimePicker style={styles.input} value={date} onChange={setDate} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  intro: {
    ...globalStyles.intro,
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 15,
  },
  block: {
    marginBottom: 15,
    justifyContent: "flex-end",
    shadowRadius: 0,
    backgroundColor: "#f8f8f8",
  },
  blockImage: {
    margin: 5,
  },
  input: {
    ...globalStyles.input,
    marginBottom: 15,
  },
  text: {
    ...globalStyles.text,
    marginBottom: 15,
  },
});

export default AppointmentScreen;
