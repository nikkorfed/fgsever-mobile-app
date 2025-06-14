import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

import Pressable from "./Pressable";
import { getWorkIcon } from "../helpers/works";
import globalStyles from "../styles";

const Work = memo(({ style, work }) => {
  const navigation = useNavigation();

  const { guid, icon, status, name, car, mileage, price, date } = work;
  const Icon = getWorkIcon(name);

  const handlePress = () => navigation.navigate("Work", { guid });

  return (
    <Pressable style={[styles.block, style]} onPress={handlePress}>
      <View style={styles.icon}>{icon || <Icon size={30} />}</View>
      <View style={styles.text}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          {status === "Ожидание" && <FontAwesome5 style={styles.statusIcon} name="clock" color="orange" size={12} />}
          {status === "В работе" && <MaterialCommunityIcons style={styles.statusIcon} name="progress-clock" color="dodgerblue" size={14} />}
          {status === "Выполнен" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
          {status === "Закрыт" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {`${car.name}, ${mileage.toLocaleString()} км`}
        </Text>
        {work.status === "Согласование" && !work.approval && (
          <View style={styles.approvingContainer}>
            <Text style={styles.approvingText}>Требует согласования</Text>
          </View>
        )}
      </View>
      <View style={styles.additional}>
        {price !== null && (
          <Text style={styles.price} numberOfLines={1}>
            {price.toLocaleString()} ₽
          </Text>
        )}
        {date !== null && (
          <Text style={styles.date} numberOfLines={1}>
            {moment(date).format("LT")}
          </Text>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  ...globalStyles,
  block: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 30,
    height: 50,
    width: 50,
    backgroundColor: "#f8f8f8",
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "center",
  },
  row: {
    ...globalStyles.row,
    alignItems: "center",
  },
  title: {
    ...globalStyles.title,
    lineHeight: 18,
  },
  statusIcon: {
    marginLeft: 5,
  },
  description: {
    ...globalStyles.description,
    marginTop: 2,
  },
  approvingContainer: {
    alignSelf: "flex-start",
    marginTop: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#f5f5f5",
  },
  approvingText: {
    ...globalStyles.text,
  },
  additional: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 10,
  },
  price: globalStyles.text,
  date: {
    ...globalStyles.description,
    marginTop: 3,
    textAlign: "right",
  },
});

export default Work;
