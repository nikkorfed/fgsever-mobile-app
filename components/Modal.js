import React from "react";
import { StyleSheet, Modal as ReactNativeModal, Animated, SafeAreaView, View, TouchableWithoutFeedback } from "react-native";

import { Button } from "./Button";

const Modal = ({ modal, children }) => {
  return (
    <ReactNativeModal visible={modal.shown} transparent>
      <TouchableWithoutFeedback onPress={modal.close}>
        <Animated.View style={[styles.modalContainer, { backgroundColor: modal.backgroundColor }]}>
          <Animated.View style={[styles.modal, { top: modal.top }]}>
            <TouchableWithoutFeedback onPress={null}>
              <SafeAreaView>
                <View style={styles.modalContent}>
                  {children}
                  <Button title="Далее" onPress={modal.close} />
                </View>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </Animated.View>
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
    marginTop: "auto",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 15,
  },
});

export default Modal;
