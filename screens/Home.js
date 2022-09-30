import React from "react";
import { View, Text, Button } from "react-native";

export default HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Домашний экран</Text>
      <Button title="Записаться на ремонт" onPress={() => navigation.navigate("Записаться")} />
    </View>
  );
};
