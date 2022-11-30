import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const SearchPartsScreen = ({ route, navigation }) => {
  const { partNumbers } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: `https://fgsever.ru/mobile-search-parts/?partNumbers=${partNumbers ?? ""}` }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchPartsScreen;
