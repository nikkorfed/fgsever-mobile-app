import { useFonts, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as Localization from "expo-localization";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "moment/locale/ru";

import api from "./api";
import StoreContext from "./context/store";
import MainNavigator from "./navigators/Main";

moment.locale(Localization.locale);
// TODO: Перевести приложение на TypeScript (чтобы видеть ошибки при импорте из неверных путей).

const App = () => {
  const [fontsLoaded] = useFonts({ Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold });
  const [cars, setCars] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [works, setWorks] = useState([]);

  const context = { cars, setCars, workTypes, setWorkTypes, works, setWorks };

  const getCars = async () => {
    const carsInStorage = JSON.parse(await AsyncStorage.getItem("cars"));
    carsInStorage && setCars(carsInStorage);
  };

  const updateCars = async () => {
    await AsyncStorage.setItem("cars", JSON.stringify(cars));
  };

  const getWorkTypes = async () => {
    const workTypes = await api.workTypes();
    setWorkTypes(workTypes);
  };

  useEffect(() => {
    getCars();
    getWorkTypes();
  }, []);

  useEffect(() => {
    updateCars();
  }, [cars]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreContext.Provider value={context}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreContext.Provider>
  );
};

export default App;
