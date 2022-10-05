import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  columns: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: -7.5,
  },
  column: {
    flex: 1,
    paddingHorizontal: 7.5,
  },
  row: {
    flexDirection: "row",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    padding: 15,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    backgroundColor: "#f8f8f8",
  },
});

export default styles;
