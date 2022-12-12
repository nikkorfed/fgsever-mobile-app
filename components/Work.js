import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import BodyRepairIcon from "../assets/icons/body-repair.svg";
import CodingIcon from "../assets/icons/coding.svg";
import DiagnosticsIcon from "../assets/icons/diagnostics.svg";
import EngineIcon from "../assets/icons/engine.svg";
import MaintenanceIcon from "../assets/icons/maintenance.svg";
import UpdateIcon from "../assets/icons/update.svg";
import UpgradeIcon from "../assets/icons/upgrade.svg";
import globalStyles from "../styles";
import Pressable from "./Pressable";

const getWorkIcon = (title) =>
  ((title === "Слесарный" || title === "Установка") && <MaintenanceIcon size={30} />) ||
  (title === "Дооснащение" && <UpgradeIcon size={30} />) ||
  (title === "Кодирование" && <CodingIcon size={30} />) ||
  (title === "Диагностика" && <DiagnosticsIcon size={30} />) ||
  (title === "Обновление ПО" && <UpdateIcon size={30} />) ||
  (title === "Ремонт двигателя" && <EngineIcon size={30} />) ||
  ((title === "Кузовной" || title === "Покраска") && <BodyRepairIcon size={30} />);

const Work = ({ style, onPress, icon, title, titleStyle, description, descriptionStyle, price, priceStyle, date, dateStyle }) => {
  return (
    <Pressable style={[styles.block, style]} onPress={onPress}>
      <View style={styles.icon}>{icon || getWorkIcon(title)}</View>
      <View style={styles.text}>
        {title !== null && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {description !== null && (
          <Text style={[styles.description, descriptionStyle]} numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.additional}>
        {price !== null && (
          <Text style={[styles.price, priceStyle]} numberOfLines={1}>
            {price.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
          </Text>
        )}
        {date !== null && (
          <Text style={[styles.date, dateStyle]} numberOfLines={1}>
            {moment(date).format("LT")}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 30,
    height: 50,
    width: 50,
    backgroundColor: "#f8f8f8",
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "center",
  },
  title: {
    ...globalStyles.title,
    lineHeight: 18,
  },
  description: {
    ...globalStyles.description,
    marginTop: 5,
  },
  additional: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 10,
  },
  price: globalStyles.text,
  date: {
    ...globalStyles.description,
    marginTop: 5,
    textAlign: "right",
  },
});

export default Work;
