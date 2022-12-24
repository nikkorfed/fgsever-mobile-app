import { useState, useRef } from "react";
import { Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useKeyboardVisible } from "./keyboard";

export const useModal = ({ onCancel, onConfirm } = {}) => {
  const { bottom } = useSafeAreaInsets();
  const [shown, setShown] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;
  const { progress: keyboardProgress } = useKeyboardVisible();

  const backgroundColor = progress.interpolate({ inputRange: [0, 1], outputRange: ["transparent", "rgba(0, 0, 0, 0.3)"] });
  const top = progress.interpolate({ inputRange: [0, 1], outputRange: ["100%", "0%"] });
  const paddingBottom = keyboardProgress.interpolate({ inputRange: [0, 1], outputRange: [bottom, 0] });

  const open = () => {
    setShown(true);
    Animated.timing(progress, { toValue: 1, duration: 300, useNativeDriver: false }).start();
  };

  const cancel = () => {
    onCancel?.();
    Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    setTimeout(() => setShown(false), 300);
  };

  const confirm = () => {
    onConfirm?.();
    Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    setTimeout(() => setShown(false), 300);
  };

  return { shown, setShown, backgroundColor, top, paddingBottom, open, cancel, confirm };
};
