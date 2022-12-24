import ReactNativeDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as Localization from "expo-localization";
import moment from "moment";
import React, { useState } from "react";
import { Platform, View, Pressable, TextInput } from "react-native";

import { useModal } from "../hooks/modal";
import globalStyles from "../styles";
import Modal from "./Modal";

const DateTimePicker = ({ style, value, onChange, placeholder }) => {
  const [tempValue, setTempValue] = useState(value);

  const dateTimeModal = useModal({ onConfirm: () => onChange(tempValue) });

  const openDateTimePickerAndroid = () =>
    DateTimePickerAndroid.open({
      value: value ?? new Date(),
      onChange: (_, date) => onChange(date),
      mode: "date",
      display: "spinner",
      themeVariant: "light",
      locale: Localization.locale,
    });

  return (
    <View>
      <Pressable onPress={Platform.OS === "ios" ? dateTimeModal.open : openDateTimePickerAndroid}>
        <TextInput
          style={[globalStyles.input, style]}
          value={value && moment(value).format("ll")}
          placeholder={placeholder ?? "Выберите дату"}
          placeholderTextColor="#aaa"
          pointerEvents="none"
          editable={false}
        />
      </Pressable>
      {Platform.OS === "ios" && (
        <Modal modal={dateTimeModal}>
          <ReactNativeDateTimePicker
            value={tempValue ?? new Date()}
            onChange={(_, date) => setTempValue(date)}
            mode="date"
            display="spinner"
            themeVariant="light"
            locale={Localization.locale}
          />
        </Modal>
      )}
    </View>
  );
};

export default DateTimePicker;
