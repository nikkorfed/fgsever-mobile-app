import ReactNativeDateTimePicker from "@react-native-community/datetimepicker";
import * as Localization from "expo-localization";
import moment from "moment";
import React from "react";
import { View, TextInput } from "react-native";

import { useModal } from "../hooks/modal";
import Modal from "./Modal";

const DateTimePicker = ({ style, value, onChange, placeholder }) => {
  const dateTimeModal = useModal();

  return (
    <View>
      <TextInput
        style={style}
        value={value && moment(value).format("ll")}
        placeholder={placeholder ?? "Выберите дату"}
        editable={false}
        onPressIn={dateTimeModal.open}
      />
      <Modal modal={dateTimeModal}>
        <ReactNativeDateTimePicker
          value={value ?? new Date()}
          onChange={(_, date) => onChange(date)}
          mode="date"
          display="spinner"
          themeVariant="light"
          locale={Localization.locale}
        />
      </Modal>
    </View>
  );
};

export default DateTimePicker;
