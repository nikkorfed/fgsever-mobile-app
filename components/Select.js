import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View, Pressable, TextInput } from "react-native";

import { useModal } from "../hooks/modal";
import globalStyles from "../styles";
import Modal from "./Modal";

const Select = ({ style, items, value, onChange, placeholder }) => {
  const selectModal = useModal();

  return (
    <View style={style}>
      <Pressable onPress={selectModal.open}>
        <TextInput
          style={styles.input}
          value={items.find((item) => item.key === value)?.label}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          pointerEvents="none"
          editable={false}
        />
      </Pressable>
      {value != null && (
        <Pressable style={styles.clearIcon} onPress={() => onChange()}>
          <FontAwesome5 name="times" color="#888" size={12} />
        </Pressable>
      )}
      <Modal modal={selectModal}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {items.map((item) => (
            <Picker.Item key={item.key} label={item.label} value={item.key} />
          ))}
        </Picker>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {},
  input: globalStyles.input,
  clearIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
  },
});

export default Select;
