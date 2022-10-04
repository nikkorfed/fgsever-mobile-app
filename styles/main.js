import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  columns: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: -7.5,
  },
  column: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 7.5,
  },
  block: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
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
  icon: {
    marginBottom: 15,
  },
  sideIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 60,
    width: 60,
    backgroundColor: "#f8f8f8",
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    backgroundColor: "#f8f8f8",
  },
});

export default styles;
