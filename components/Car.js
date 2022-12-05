import React from "react";
import { StyleSheet, Image, View, Text, Dimensions } from "react-native";

import globalStyles from "../styles";

const Car = ({ style, image, label, licensePlate, vin, model, modelCode, productionDate }) => {
  return (
    <View style={[styles.block, style]}>
      <Image style={styles.image} resizeMode="contain" source={{ uri: image }} />
      <View style={styles.header}>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.description}>{licensePlate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>VIN: </Text>
        <Text style={styles.text}>{vin}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Модель: </Text>
        <Text style={styles.text}>{model}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Обозначение кузова: </Text>
        <Text style={styles.text}>{modelCode}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Дата изготовления: </Text>
        <Text style={styles.text}>{productionDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: Dimensions.get("window").width > 400 ? 15 : 12,
    width: "100%",
    backgroundColor: "white",
    shadowOpacity: 0.1,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 10,
  },
  image: {
    height: 160,
  },
  header: {
    marginBottom: 5,
  },
  row: {
    ...globalStyles.row,
    alignItems: "center",
    marginTop: 5,
  },
  title: {
    ...globalStyles.title,
  },
  description: {
    ...globalStyles.description,
  },
});

export default Car;
