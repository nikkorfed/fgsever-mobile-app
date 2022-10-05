import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Pressable from "../components/Pressable";
import globalStyles from "../styles";

const Block = ({ style, onPress, icon, title, titleStyle, description, descriptionStyle, sideIcon, buttons }) => {
  return (
    <Pressable style={[styles.block, style]} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.text}>
          {icon && <View style={styles.icon}>{icon}</View>}
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}
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
});

export default Block;
