import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Block from "../components/Block";
import { Button } from "../components/Button";
import Carousel from "../components/Carousel";
import DateTimePicker from "../components/DateTimePicker";
import Screen from "../components/Screen";
import Select from "../components/Select";
import { cars, services } from "../mocks";
import globalStyles from "../styles";

const AppointmentScreen = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();

  const [car, setCar] = useState();
  const [service, setService] = useState();
  const [date, setDate] = useState();

  return (
    <Screen
      style={{ paddingHorizontal: 0 }}
      fixedBottom={<Button title="Далее" onPress={() => navigation.navigate("Booking")} />}
      fixedBottomStyle={{ paddingHorizontal: 20, bottom }}
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
            title={item.label}
            description={item.licensePlate}
            descriptionStyle={styles.blockDescription}
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
  text: {
    ...globalStyles.text,
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
  blockDescription: {
    marginTop: 0,
    marginBottom: -5,
  },
  input: {
    marginBottom: 15,
  },
});

export default AppointmentScreen;
