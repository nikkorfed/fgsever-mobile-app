import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

const loadingAnimation = require("../assets/animations/loading.json");

const Spinner = ({ style }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.reset();
    setTimeout(() => ref.current?.play(), 0);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <LottieView
        style={[styles.icon]}
        source={loadingAnimation}
        colorFilters={[{ keypath: "Shape Layer 2", color: "dodgerblue" }]}
        autoPlay
        ref={ref}
      />
    </View>
  );
};

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
  icon: {
    height: 100,
    width: 100,
  },
});

export default Spinner;
