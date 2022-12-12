import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import { StyleSheet, View, Text } from "react-native";

import Block from "../components/Block";
import Screen from "../components/Screen";
import { getWorkIcon } from "../helpers/works";
import globalStyles from "../styles";

const WorkScreen = ({ route, navigation }) => {
  const { work } = route.params;
  const Icon = getWorkIcon(work.name);

  return (
    <Screen>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Icon size={50} />
        </View>
        <Text style={styles.intro}>{work.name}</Text>
        <Text style={styles.introDescription}>{moment(work.date).format("lll")}</Text>
        {work.status && (
          <View style={styles.status}>
            {work.status === "В работе" && <FontAwesome5 style={styles.statusIcon} name="clock" color="orange" size={12} />}
            {work.status === "Выполнен" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
            <Text style={styles.text}>{work.status}</Text>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Вид работ</Text>
        <Text style={styles.description}>{work.details}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Автомобиль</Text>
        <Text style={styles.description}>{work.car.label}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Пробег</Text>
        <Text style={styles.description}>{work.mileage.toLocaleString()} км</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Дата посещения</Text>
        <Text style={styles.description}>{moment(work.date).format("lll")}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Стоимость</Text>
        <View style={styles.prices}>
          <View style={styles.price}>
            <Text style={styles.priceName}>Детали</Text>
            <Text style={styles.priceValue}>{work.partsPrice.toLocaleString()} ₽</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceName}>Работы</Text>
            <Text style={styles.priceValue}>{work.worksPrice.toLocaleString()} ₽</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceName}>Общая стоимость</Text>
            <Text style={styles.priceValue}>{work.price.toLocaleString()} ₽</Text>
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
