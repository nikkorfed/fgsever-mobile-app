import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, TextInput } from "react-native";

import { useModal } from "../hooks/modal";
import Modal from "./Modal";

const Select = ({ style, items, value, onChange, placeholder }) => {
  const selectModal = useModal();

  return (
    <View>
      <TextInput
        style={style}
        value={items.find((item) => item.key === value)?.title}
        placeholder={placeholder}
        editable={false}
        onPressIn={selectModal.open}
      />
      <Modal modal={selectModal}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {items.map((item) => (
            <Picker.Item key={item.key} label={item.title} value={item.key} />
          ))}
        </Picker>
      </Modal>
    </View>
  );
};

export default Select;
