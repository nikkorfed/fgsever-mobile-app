import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  headerButton: {
    fontSize: 16,
  },
  headerTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textAlign: Platform.OS === "ios" ? "center" : "left",
  },
  headerSubtitle: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    textAlign: Platform.OS === "ios" ? "center" : "left",
    color: "#888",
  },
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
  sectionTitle: {
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
    color: "#333",
    backgroundColor: "#f8f8f8",
  },
});

export default styles;
