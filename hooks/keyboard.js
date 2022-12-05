import { useState, useEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";

export const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () =>
      Animated.timing(progress, { toValue: 1, duration: 150, useNativeDriver: false }).start()
    );
    const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () =>
      Animated.timing(progress, { toValue: 0, duration: 150, useNativeDriver: false }).start()
    );

    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return { keyboardVisible, progress };
};
