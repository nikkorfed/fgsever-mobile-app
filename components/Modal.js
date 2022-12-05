import React from "react";
import { StyleSheet, Modal as ReactNativeModal, Animated, KeyboardAvoidingView, View, TouchableWithoutFeedback } from "react-native";

import { Button } from "./Button";

// TODO: Try to reimplement with 'react-native-bottom-sheet' by Gorhom.
const Modal = ({ modal, noButton, children }) => {
  return (
    <ReactNativeModal visible={modal.shown} transparent>
      <TouchableWithoutFeedback onPress={modal.close}>
        <Animated.View style={[styles.modalContainer, { backgroundColor: modal.backgroundColor }]}>
          <KeyboardAvoidingView style={{ marginTop: "auto" }} behavior="padding">
            <Animated.View style={[styles.modal, { top: modal.top, paddingBottom: modal.paddingBottom }]}>
              <TouchableWithoutFeedback onPress={null}>
                <View style={styles.modalContent}>
                  {children}
                  {!noButton && <Button title="Далее" onPress={modal.close} />}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </KeyboardAvoidingView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 15,
  },
});

export default Modal;
