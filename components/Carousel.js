import React from "react";
import { Dimensions, StyleSheet, ScrollView, View } from "react-native";

import { screenHorizontalPadding } from "../constants/paddings";

const windowWidth = Dimensions.get("window").width;
const cardsOffset = 15;

const Carousel = ({ style, children }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.columns}>
        <ScrollView contentContainerStyle={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
          {children.map((children, index) => (
            <View key={index} style={styles.card}>
              {children}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: -5,
  },
  scrollView: {
    paddingVertical: 5,
    paddingHorizontal: screenHorizontalPadding - cardsOffset / 2,
  },
  card: {
    paddingHorizontal: cardsOffset / 2,
    height: (windowWidth - screenHorizontalPadding) / 2.2,
    width: (windowWidth - screenHorizontalPadding) / 2.2,
  },
});

export default Carousel;
