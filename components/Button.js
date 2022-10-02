import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Pressable from "./Pressable";

// Попробовать реализовать экспорт вида Button, { SimpleButton }

export const BackButton = ({ style, title, ...props }) => {
  const navigation = useNavigation();

  const color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  const textStyle = { color: color ?? "dodgerblue" };

  return (
    <TouchableOpacity style={[styles.back, style]} activeOpacity={0.5} onPress={navigation.goBack} {...props}>
      <AntDesign name="arrowleft" size={26} color="dodgerblue" />
      {title && <Text style={[styles.buttonText, styles.backText, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export const Button = ({ style, title, ...props }) => {
  // Проверить, как в Pressable передается style в виде массива в массиве. Если не передается, самому через reduce() собирать объект со стилями.
  const color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  const textStyle = { color: color ?? "white" };

  return (
    <Pressable style={[styles.button, style]} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export const SimpleButton = ({ style, title, ...props }) => {
  const color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  const textStyle = { color: color ?? "dodgerblue" };
  return (
    <TouchableOpacity style={[styles.button, styles.simpleButton, style]} activeOpacity={0.8} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  bottomButtons: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "dodgerblue",
  },
  simpleButton: {
    backgroundColor: undefined,
  },
  buttonText: {
    fontFamily: "Montserrat_600SemiBold",
    color: "white",
  },
});
