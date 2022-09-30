import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  back: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontWeight: "500",
  },
  bottomButtons: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    width: "100%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "dodgerblue",
  },
  simpleButton: {
    backgroundColor: undefined,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
