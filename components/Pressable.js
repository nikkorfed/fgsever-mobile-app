import React, { useRef } from "react";
import { Animated, Pressable as ReactNativePressable, View } from "react-native";

const Pressable = ({ style, onPress, children }) => {
  const Component = onPress ? ReactNativePressable : View;

  const scale = useRef(new Animated.Value(1)).current;

  const scaleUp = () => Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }).start();
  const scaleDown = () => Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <Component style={style} onPress={onPress} onPressIn={scaleDown} onPressOut={scaleUp}>
        {children}
      </Component>
    </Animated.View>
  );
};

export default Pressable;
