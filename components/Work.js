import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles from "../styles";
import Pressable from "./Pressable";

const Work = ({ style, onPress, icon, title, titleStyle, description, descriptionStyle, price, priceStyle, date, dateStyle }) => {
  return (
    <Pressable style={[styles.block, style]} onPress={onPress}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <View style={styles.text}>
        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {description && (
          <Text style={[styles.description, descriptionStyle]} numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.additional}>
        {price && (
          <Text style={[styles.price, priceStyle]} numberOfLines={1}>
            {price.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
          </Text>
        )}
        {date && (
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
