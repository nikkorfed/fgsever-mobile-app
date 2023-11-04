import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";

import Modal from "./Modal";
import { useModal } from "../hooks/modal";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const CarPicker = ({ style, value, onChange, children }) => {
  const { cars } = useStore();

  const [tempValue, setTempValue] = useState(value);
  const pickerRef = useRef();

  const selectModal = useModal({
    onOpen: () => setTempValue(cars[0].guid),
    onConfirm: () => onChange(tempValue),
  });

  const openAndroid = () => pickerRef.current.focus();

  const handleSelectCar = Platform.OS === "ios" ? selectModal.open : openAndroid;

  return (
    <View style={style}>
      {children({ onPress: handleSelectCar })}
      {Platform.OS === "ios" ? (
        <Modal modal={selectModal}>
          <Picker selectedValue={tempValue} onValueChange={setTempValue}>
            {cars.map((item) => (
              <Picker.Item key={item.guid} label={item.name} value={item.guid} />
            ))}
          </Picker>
        </Modal>
      ) : (
        <Picker ref={pickerRef} style={styles.pickerAndroid} selectedValue={value} onValueChange={onChange}>
          <Picker.Item key="placeholder" label="Автомобиль" color="#aaa" enabled={false} />
          {cars.map((item) => (
            <Picker.Item key={item.guid} label={item.name} value={item.guid} />
          ))}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  pickerAndroid: {
    display: "none",
  },
});

export default CarPicker;
