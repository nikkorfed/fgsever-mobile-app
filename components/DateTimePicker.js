import ReactNativeDateTimePicker from "@react-native-community/datetimepicker";
import * as Localization from "expo-localization";
import moment from "moment";
import React, { useState, useRef } from "react";
import { StyleSheet, Animated, View, TextInput, Modal, SafeAreaView } from "react-native";

import { Button } from "./Button";

const DateTimePicker = ({ style, value, onChange, placeholder }) => {
  const [modalShown, setModalShown] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;
  const backgroundColor = progress.interpolate({ inputRange: [0, 1], outputRange: ["transparent", "rgba(0, 0, 0, 0.3)"] });
  const top = progress.interpolate({ inputRange: [0, 1], outputRange: ["100%", "0%"] });

  const openModal = () => {
    setModalShown(true);
    Animated.timing(progress, { toValue: 1, duration: 300, useNativeDriver: false }).start();
  };

  const closeModal = () => {
    Animated.timing(progress, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    setTimeout(() => setModalShown(false), 300);
  };

  return (
    <View>
      <TextInput
        style={style}
        value={value && moment(value).format("ll")}
        placeholder={placeholder}
        editable={false}
        onPressIn={openModal}
      />
      <Modal visible={modalShown} transparent>
        <Animated.View style={[styles.modalContainer, { backgroundColor }]}>
          <Animated.View style={[styles.modal, { top }]}>
            <SafeAreaView>
              <View style={styles.modalContent}>
                <ReactNativeDateTimePicker
                  value={value ?? new Date()}
                  onChange={(_, date) => onChange(date)}
                  mode="date"
                  display="spinner"
                  locale={Localization.locale}
                />
                <Button title="Далее" onPress={closeModal} />
              </View>
            </SafeAreaView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modal: {
    marginTop: "auto",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 15,
  },
});

export default DateTimePicker;
