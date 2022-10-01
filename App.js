import { useFonts, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import MainNavigator from "./navigators/Main";

const App = () => {
  const [fontsLoaded] = useFonts({ Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
export default App;
