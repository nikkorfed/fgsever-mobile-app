import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Block from "../components/Block";
import { Button } from "../components/Button";
import Carousel from "../components/Carousel";
import DateTimePicker from "../components/DateTimePicker";
import NumberInput from "../components/NumberInput";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const ParkScreen = ({ navigation }) => {
  const [house, setHouse] = useState(0);
  const [date, setDate] = useState();
  const [guests, setGuests] = useState(2);

  return (
    <Screen
      style={{ paddingHorizontal: 0, backgroundColor: "white" }}
      fixedBottom={<Button title="Далее" onPress={() => navigation.navigate("Booking")} />}
      fixedBottomStyle={{ paddingHorizontal: 20 }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.intro}>Выберите необходимый дом, дату посещения и количество гостей</Text>
        <Text style={styles.title}>Дом</Text>
      </View>
      <Carousel>
        <Block
          style={styles.block}
          title="Приморский дом"
          image="https://dizajn-interera.ru-land.com/sites/default/files/i/32419/4-11/646d958f7b8f.jpg"
          selected={house === 0}
          onPress={() => setHouse(0)}
        />
        <Block
          style={styles.block}
          title="Современный дом"
          image="https://pro-dachnikov.com/uploads/posts/2021-10/1633300994_18-p-krasivie-doma-khai-tek-foto-20.jpg"
          selected={house === 1}
          onPress={() => setHouse(1)}
        />
        <Block
          style={styles.block}
          title="Русский дом"
          image="https://cdn.shopify.com/s/files/1/0320/4248/3849/articles/Lawless_Cottage_designed_by_Searl_Lamaster_Howe_photo_by_Tony_Soluri_featured_grande.jpg?v=1619269084"
          selected={house === 2}
          onPress={() => setHouse(2)}
        />
        <Block
          style={styles.block}
          title="Скандинавский дом"
          image="https://www.thestreet.com/.image/t_share/MTY4NjQ3ODM2NDU3NTc2MDcx/these-luxurious-hgtv-houses-are-available-for-your-next-vacation.png"
          selected={house === 3}
          onPress={() => setHouse(3)}
        />
      </Carousel>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>День</Text>
        <DateTimePicker style={styles.input} value={date} onChange={setDate} />
        <NumberInput style={styles.numberInput} title="Количество гостей" value={guests} onChange={setGuests} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  intro: {
    ...globalStyles.intro,
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
  },
  input: {
    ...globalStyles.input,
    marginBottom: 15,
  },
  numberInput: {
    marginBottom: 15,
  },
});

export default ParkScreen;
