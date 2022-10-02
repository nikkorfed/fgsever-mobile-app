import React, { useRef } from "react";
import { Animated, Pressable as ReactNativePressable } from "react-native";

const Pressable = ({ style, onPress, children }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const scaleUp = () => Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }).start();
  const scaleDown = () => Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <ReactNativePressable onPress={onPress} onPressIn={scaleDown} onPressOut={scaleUp}>
        {children}
      </ReactNativePressable>
    </Animated.View>
  );
};

export default Pressable;
