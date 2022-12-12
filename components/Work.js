import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { getWorkIcon } from "../helpers/works";
import globalStyles from "../styles";
import Pressable from "./Pressable";

const Work = ({ style, onPress, icon, status, name, car, mileage, price, date }) => {
  const Icon = getWorkIcon(name);
  return (
    <Pressable style={[styles.block, style]} onPress={onPress}>
      <View style={styles.icon}>{icon || <Icon size={30} />}</View>
      <View style={styles.text}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          {status === "В работе" && <FontAwesome5 style={styles.statusIcon} name="clock" color="orange" size={12} />}
          {status === "Выполнен" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {`${car.label}, ${mileage.toLocaleString()} км`}
        </Text>
      </View>
      <View style={styles.additional}>
        {price !== null && (
          <Text style={styles.price} numberOfLines={1}>
            {price.toLocaleString()} ₽
          </Text>
        )}
        {date !== null && (
          <Text style={styles.date} numberOfLines={1}>
            {moment(date).format("LT")}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
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
  row: {
    ...globalStyles.row,
    alignItems: "center",
  },
  title: {
    ...globalStyles.title,
    lineHeight: 18,
  },
  statusIcon: {
    marginLeft: 5,
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
