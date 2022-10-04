import { StyleSheet } from "react-native";

import mainStyles from "./main";

const styles = StyleSheet.create({
  title: {
    ...mainStyles.title,
    fontSize: 16,
  },
  description: {
    ...mainStyles.description,
    fontSize: 14,
  },
});

export default styles;
