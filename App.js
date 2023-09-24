import { useFonts, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as Localization from "expo-localization";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "moment/locale/ru";

import api from "./api";
import Spinner from "./components/Spinner";
import StoreContext from "./context/store";
import { registerForPushNotifications } from "./helpers/push-token";
import MainNavigator from "./navigators/Main";

import "./helpers/notifications";

moment.locale(Localization.locale);
// TODO: Перевести приложение на TypeScript (чтобы видеть ошибки при импорте из неверных путей).

const App = () => {
  const [fontsLoaded] = useFonts({ Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold });

  const [pushToken, setPushToken] = useState([]);
  const [cars, setCars] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [works, setWorks] = useState([]);

  const storeContext = { pushToken, setPushToken, cars, setCars, workTypes, setWorkTypes, works, setWorks };

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

  const getPushToken = async () => {
    const pushToken = await registerForPushNotifications();
    pushToken && setPushToken(pushToken);
  };

  useEffect(() => {
    getPushToken();
    getCars();
    getWorkTypes();
  }, []);

  useEffect(() => {
    updateCars();
  }, [cars]);

  if (!fontsLoaded || !workTypes.length) return <Spinner />;

  return (
    <StoreContext.Provider value={storeContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreContext.Provider>
  );
};

export default App;
