import { MaterialCommunityIcons } from "@expo/vector-icons";
import { React } from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles from "../styles";
import Pressable from "./Pressable";

const NumberInput = ({ title, value, onChange }) => {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(value - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={decrease}>
          <MaterialCommunityIcons name="minus" color="grey" size={30} />
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable style={styles.button} onPress={increase}>
          <MaterialCommunityIcons name="plus" color="grey" size={30} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    height: 40,
    width: 40,
    backgroundColor: "#f8f8f8",
  },
  value: {
    ...globalStyles.title,
    marginHorizontal: 20,
  },
});

export default NumberInput;
