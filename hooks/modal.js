import { useState, useRef } from "react";
import { Animated } from "react-native";

export const useModal = () => {
  const [shown, setShown] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;
  const backgroundColor = progress.interpolate({ inputRange: [0, 1], outputRange: ["transparent", "rgba(0, 0, 0, 0.3)"] });
  const top = progress.interpolate({ inputRange: [0, 1], outputRange: ["100%", "0%"] });

  const open = () => {
    setShown(true);
    Animated.timing(progress, { toValue: 1, duration: 300, useNativeDriver: false }).start();
  };

  const close = () => {
    Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    setTimeout(() => setShown(false), 300);
  };

  return { shown, setShown, backgroundColor, top, open, close };
};
