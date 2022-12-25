import moment from "moment";
import { StyleSheet, View, Text } from "react-native";

import Screen from "../components/Screen";
import globalStyles from "../styles";

const ProfileScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.section}>
        <Text style={styles.title}>Ваше имя</Text>
        <Text style={styles.description}>Иванов Иван Иванович</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Телефон</Text>
        <Text style={styles.description}>+7 (922) 123-45-67</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.description}>mail@example.ru</Text>
      </View>
      <View style={[styles.section, styles.sectionLast]}>
        <Text style={styles.title}>Дата регистрации</Text>
        <Text style={styles.description}>{moment.utc(1664741138101).format("lll")}</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  section: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  sectionLast: {
    borderBottomWidth: 0,
  },
  title: {
    ...globalStyles.description,
  },
  description: {
    ...globalStyles.text,
    marginTop: 5,
  },
});

export default ProfileScreen;
