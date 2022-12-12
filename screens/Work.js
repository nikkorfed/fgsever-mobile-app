import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import { StyleSheet, View, Text } from "react-native";

import UpgradeIcon from "../assets/icons/upgrade.svg";
import Block from "../components/Block";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const WorkScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <UpgradeIcon size={50} />
        </View>
        <Text style={styles.intro}>Дооснащение</Text>
        <Text style={styles.introDescription}>{moment().format("lll")}</Text>
        <View style={styles.status}>
          <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={10} />
          <Text style={styles.text}>Выполнен</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Вид работ</Text>
        <Text style={styles.description}>Установка активного круиз-контроля (5DF)</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Автомобиль</Text>
        <Text style={styles.description}>BMW X5 (А001АА197)</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Пробег</Text>
        <Text style={styles.description}>75 120 км</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Дата посещения</Text>
        <Text style={styles.description}>{moment.utc().format("lll")}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Стоимость</Text>
        <View style={styles.prices}>
          <View style={styles.price}>
            <Text style={styles.priceName}>Детали</Text>
            <Text style={styles.priceValue}>8 500 руб.</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceName}>Работы</Text>
            <Text style={styles.priceValue}>6 000 руб.</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceName}>Общая стоимость</Text>
            <Text style={styles.priceValue}>14 500 руб.</Text>
          </View>
        </View>
      </View>
      <Text style={{ ...styles.title, marginBottom: 10 }}>Фотографии</Text>
      <View style={styles.columns}>
        <View style={styles.column}>
          <Block style={{ paddingBottom: "75%" }} image="https://fgsever.ru/images/about/6.jpg" />
        </View>
        <View style={styles.column}>
          <Block style={{ paddingBottom: "75%" }} image="https://fgsever.ru/images/about/8.jpg" />
        </View>
        <View style={styles.column}>
          <Block style={{ paddingBottom: "75%" }} image="https://fgsever.ru/images/about/15.jpg" />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: "#f8f8f8",
  },
  intro: {
    ...globalStyles.title,
    textAlign: "center",
  },
  introDescription: {
    ...globalStyles.description,
    marginTop: 5,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f8f8f8",
  },
  statusIcon: { marginRight: 5 },
  section: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  title: {
    ...globalStyles.description,
  },
  description: {
    ...globalStyles.text,
    marginTop: 5,
  },
  prices: {
    // marginVertical: 10,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  priceName: {
    ...globalStyles.text,
  },
  priceValue: {
    ...globalStyles.text,
    fontFamily: "Montserrat_600SemiBold",
  },
  totalCost: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default WorkScreen;
