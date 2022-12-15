import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View, Pressable, TextInput } from "react-native";

import { useModal } from "../hooks/modal";
import globalStyles from "../styles";
import Modal from "./Modal";

const Select = ({ style, items, value, onChange, labelProp = "name", valueProp = "key", placeholder }) => {
  const selectModal = useModal();

  return (
    <View style={[styles.container, style]}>
      <Pressable style={{ flexGrow: 1 }} onPress={selectModal.open}>
        <TextInput
          style={styles.input}
          value={items.find((item) => item[valueProp] === value)?.[labelProp]}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          pointerEvents="none"
          editable={false}
        />
      </Pressable>
      {value == null ? (
        <Pressable style={styles.icon} onPress={selectModal.open}>
          <FontAwesome5 name="angle-down" color="#bbb" size={14} />
        </Pressable>
      ) : (
        <Pressable style={styles.icon} onPress={() => onChange()}>
          <FontAwesome5 name="times" color="#888" size={12} />
        </Pressable>
      )}
      <Modal modal={selectModal}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {items.map((item) => (
            <Picker.Item key={item[valueProp]} label={item[labelProp]} value={item[valueProp]} />
          ))}
        </Picker>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    borderRadius: globalStyles.input.borderRadius,
    height: globalStyles.input.height,
    backgroundColor: globalStyles.input.backgroundColor,
    flexDirection: "row",
  },
  input: {
    ...globalStyles.input,
    paddingRight: 0,
    height: "100%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 40,
  },
});

export default Select;
