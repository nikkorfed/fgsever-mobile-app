import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Pressable from "../components/Pressable";
import globalStyles from "../styles";

const Block = ({ style, onPress, image, icon, title, titleStyle, description, descriptionStyle, sideIcon, buttons, selected }) => {
  return (
    <Pressable style={[styles.block, style]} onPress={onPress}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      {image && <LinearGradient style={styles.overlay} colors={["transparent", "rgba(0, 0, 0, 0.5)"]} start={{ x: 0.5, y: 0.5 }} />}
      <View style={styles.row}>
        <View style={styles.text}>
          {icon && <View style={styles.icon}>{icon}</View>}
          {title && <Text style={[styles.title, titleStyle, image && { color: "white" }]}>{title}</Text>}
          {description && <Text style={[styles.description, descriptionStyle, image && { color: "white" }]}>{description}</Text>}
        </View>
        {sideIcon && <View style={styles.sideIcon}>{sideIcon}</View>}
      </View>
      {buttons && <View style={styles.buttons}>{buttons}</View>}
      {selected && <View style={styles.selected} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    shadowOpacity: 0.1,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
  },
  icon: {
    marginBottom: 15,
  },
  text: {
    flexShrink: 1,
  },
  title: globalStyles.title,
  description: globalStyles.description,
  sideIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    height: 60,
    width: 60,
    backgroundColor: "#f8f8f8",
  },
  buttons: {
    marginTop: 15,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
  selected: {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderWidth: 2.5,
    borderColor: "dodgerblue",
    borderRadius: 15,
  },
});

export default Block;
