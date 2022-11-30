import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  intro: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    lineHeight: 18,
    color: "#888",
  },
  section: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    lineHeight: 20,
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
  text: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    lineHeight: 18,
    color: "#333",
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    backgroundColor: "#f8f8f8",
  },
});

export default styles;
