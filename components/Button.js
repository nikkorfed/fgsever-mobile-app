import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

export let BackButton = ({ style, title, ...props }) => {
  const navigation = useNavigation();

  let color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  let textStyle = { color: color ?? "dodgerblue" };

  return (
    <TouchableOpacity style={[styles.back, style]} activeOpacity={0.5} onPress={navigation.goBack} {...props}>
      <AntDesign name="arrowleft" size={26} color="dodgerblue" />
      {title && <Text style={[styles.buttonText, styles.backText, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export let Button = ({ style, title, ...props }) => {
  let color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  let textStyle = { color: color ?? "white" };

  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export let SimpleButton = ({ style, title, ...props }) => {
  let color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  let textStyle = { color: color ?? "dodgerblue" };
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
