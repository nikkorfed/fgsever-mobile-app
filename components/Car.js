import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Image, View, Text, Dimensions, Pressable, Alert } from "react-native";

import api from "../api";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const Car = ({ style, guid, name, vin }) => {
  const { pushToken, setCars } = useStore();

  const handleDelete = async () => {
    await api.removePushToken({ token: pushToken, type: "car", refGuid: guid });
    setCars((prev) => prev.filter((car) => car.guid !== guid));
  };

  const handlePressDelete = () => {
    Alert.alert(`Вы действительно хотите удалить ${name}?`, null, [
      { text: "Отмена" },
      { text: "Удалить", onPress: handleDelete, style: "destructive" },
    ]);
  };

  return (
    <View style={[styles.block, style]}>
      {/* <Image style={styles.image} resizeMode="contain" source={{ uri: image }} /> */}
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>{vin}</Text>
        {/* <Text style={styles.description}>VIN: </Text>
        <Text style={styles.text}>{vin}</Text> */}
      </View>
      {/* <View style={styles.row}>
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
      </View> */}
      <Pressable style={styles.icon} onPress={handlePressDelete}>
        <FontAwesome5 name="trash" color="lightgrey" size={12} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    position: "relative",
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
    // marginBottom: 5,
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
  icon: {
    position: "absolute",
    top: 5,
    right: 5,
    borderColor: "lightgrey",
    padding: 10,
  },
});

export default Car;
