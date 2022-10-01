import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

import MainNavigator from "./navigators/Main";

export default App = () => {
  let [fontsLoaded] = useFonts({ Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
