import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const loadingAnimation = require("../assets/animations/loading.json");

const Spinner = ({ containerStyle, style }) => (
  <View style={[styles.container, containerStyle]}>
    <LottieView
      style={[styles.loading, style]}
      source={loadingAnimation}
      colorFilters={[{ keypath: "Shape Layer 2", color: "dodgerblue" }]}
      autoPlay
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  loading: {
    height: 100,
    width: 100,
  },
});

export default Spinner;
