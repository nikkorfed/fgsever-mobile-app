import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as StatusBar from "expo-status-bar";
import moment from "moment";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, Animated, Platform } from "react-native";
import NativeImageViewer from "react-native-image-viewing";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { formatDate } from "../helpers/works";
import globalStyles from "../styles";
import Pressable from "./Pressable";

const ImageViewer = ({ images, imageIndex, setImageIndex }) => {
  useEffect(() => {
    Platform.OS === "ios" && StatusBar.setStatusBarHidden(imageIndex !== null);
  }, [imageIndex === null]);

  const handleClose = () => {
    setImageIndex(null);
  };

  const Header = ({ imageIndex }) => {
    const insets = useSafeAreaInsets();
    return (
      <View style={[styles.headerContainer, { paddingTop: Platform.OS === "ios" ? insets.top : 0 }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </Pressable>
          </View>
          <Text style={styles.counterText}>
            {imageIndex + 1} из {images.length}
          </Text>
          <View style={styles.headerRight}>
            {false && (
              <Pressable style={[styles.headerButton, { marginRight: -10 }]} onPress={() => {}}>
                <MaterialCommunityIcons name="dots-horizontal" color="white" size={22} />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  };

  const Footer = ({ imageIndex }) => {
    const caption = images[imageIndex].description;
    const insets = useSafeAreaInsets();

    return (
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Animated.View style={styles.footerContainer}>
          {caption && <Text style={styles.footerText}>{caption}</Text>}
          <View style={styles.footerButtons}>
            <Text style={styles.footerDate}>
              {formatDate(images[imageIndex].createdAt)}, {moment(images[imageIndex].createdAt).format("HH:mm")}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <NativeImageViewer
      images={images.map((image) => ({ uri: image.url }))}
      visible={imageIndex !== null}
      imageIndex={imageIndex}
      onRequestClose={handleClose}
      HeaderComponent={Header}
      FooterComponent={Footer}
    />
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  headerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
    height: 50,
  },
  headerLeft: {
    flexDirection: "row",
    flexBasis: 100,
    flexGrow: 1,
  },
  headerRight: {
    flexDirection: "row",
    flexBasis: 100,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  closeButton: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  counterText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  headerButton: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  footer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  footerContainer: {
    padding: 5,
  },
  footerText: {
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    paddingHorizontal: 5,
    paddingBottom: Platform.OS === "ios" ? 5 : 2,
    fontSize: 16,
    color: "white",
  },
  footerTextRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  footerTextInput: {
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 15,
  },
  footerSendButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 15,
    height: 30,
    width: 30,
    backgroundColor: "dodgerblue",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    minHeight: 20,
  },
  footerLeft: {
    flexDirection: "row",
    flexBasis: 100,
    flexGrow: 1,
  },
  footerDate: {
    alignSelf: "center",
    paddingBottom: 5,
    fontSize: 15,
    color: "#aaa",
  },
  footerRight: {
    flexDirection: "row",
    flexBasis: 100,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  deleteButton: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -10,
    width: 40,
  },
});

export default ImageViewer;
