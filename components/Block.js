import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Pressable from "../components/Pressable";

const Block = ({ onPress, icon, title, description, sideIcon, buttons }) => {
  return (
    <Pressable style={styles.block} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.text}>
          {icon && <View style={styles.icon}>{icon}</View>}
          {title && <Text style={styles.title}>{title}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {sideIcon && <View style={styles.sideIcon}>{sideIcon}</View>}
      </View>
      {buttons && <View style={styles.buttons}>{buttons}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 15,
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
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    lineHeight: 20,
  },
  description: {
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    lineHeight: 18,
    color: "#888",
  },
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
});

export default Block;
