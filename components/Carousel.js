import React from "react";
import { Dimensions, StyleSheet, ScrollView, View } from "react-native";

const windowWidth = Dimensions.get("window").width;

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
    marginHorizontal: -20,
  },
  scrollView: {
    paddingVertical: 5,
    paddingHorizontal: 12.5,
  },
  card: {
    paddingHorizontal: 7.5,
    width: (windowWidth - 20) / 2.5,
  },
});

export default Carousel;
