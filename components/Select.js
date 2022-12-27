import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef } from "react";
import { Platform, StyleSheet, View, Pressable, TextInput } from "react-native";

import { useModal } from "../hooks/modal";
import globalStyles from "../styles";
import Modal from "./Modal";

const Select = ({ style, items, value, onChange, labelProp = "name", valueProp = "key", placeholder }) => {
  const [tempValue, setTempValue] = useState(value);
  const pickerRef = useRef();

  const selectModal = useModal({ onConfirm: () => onChange(tempValue) });

  const openAndroid = () => pickerRef.current.focus();

  return (
    <View style={[styles.container, style]}>
      <Pressable style={{ flexGrow: 1, minWidth: 120 }} onPress={Platform.OS === "ios" ? selectModal.open : openAndroid}>
        <TextInput
          style={styles.input}
          value={items.find((item) => item[valueProp] === value)?.[labelProp]}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          pointerEvents="none"
          numberOfLines={1}
          editable={false}
        />
      </Pressable>
      {value == null ? (
        <Pressable style={styles.icon} onPress={Platform.OS === "ios" ? selectModal.open : openAndroid}>
          <FontAwesome5 name="angle-down" color="#bbb" size={14} />
        </Pressable>
      ) : (
        <Pressable style={styles.icon} onPress={() => onChange()}>
          <FontAwesome5 name="times" color="#888" size={12} />
        </Pressable>
      )}
      {Platform.OS === "ios" ? (
        <Modal modal={selectModal}>
          <Picker selectedValue={tempValue} onValueChange={setTempValue}>
            {items.map((item) => (
              <Picker.Item key={item[valueProp]} label={item[labelProp]} value={item[valueProp]} />
            ))}
          </Picker>
        </Modal>
      ) : (
        <Picker ref={pickerRef} style={styles.pickerAndroid} selectedValue={value} onValueChange={onChange}>
          {items.map((item) => (
            <Picker.Item key={item[valueProp]} label={item[labelProp]} value={item[valueProp]} />
          ))}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    flexDirection: "row",
    borderRadius: globalStyles.input.borderRadius,
    height: globalStyles.input.height,
    backgroundColor: globalStyles.input.backgroundColor,
  },
  input: {
    ...globalStyles.input,
    textAlign: "left",
    paddingRight: 10,
    height: "100%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 40,
  },
  pickerAndroid: {
    display: "none",
  },
});

export default Select;
