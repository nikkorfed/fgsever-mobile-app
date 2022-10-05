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
  blockIcon: {
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
  input: {
    borderRadius: 10,
    padding: 15,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    backgroundColor: "#f8f8f8",
  },
});

export default styles;
