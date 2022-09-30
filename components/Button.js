import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import styles from "../styles/buttons";

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
