import * as Device from "expo-device";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
// import { getDeviceName } from "react-native-device-info";

import TickIcon from "../assets/icons/tick.svg";
import Block from "../components/Block";
import { Button, SimpleButton } from "../components/Button";
import Map from "../components/Map";
import Screen from "../components/Screen";
import globalStyles from "../styles";

const loadingAnimation = require("../assets/animations/loading.json");

const parkCoordinates = {
  longitude: 37.819658,
  latitude: 56.4547,
};

const BookingScreen = () => {
  const [route, setRoute] = useState({ to: parkCoordinates });
  const isRouteReady = route.from && route.to && route.distance && route.duration;

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const { coords } = await Location.getCurrentPositionAsync({});
    setRoute((prev) => ({ ...prev, from: coords }));
  };

  useEffect(() => {
    getLocation();
  }, []);

  const routeDetails = route.distance && route.duration && `${route.distance}, ${route.duration}`;

  const openMap = async () => {
    const url = `yandexmaps://maps.yandex.ru/?pt=${route.to.longitude},${route.to.latitude}&z=14`;
    await Linking.openURL(url).catch(() => Linking.openURL(url.replace("yandexmaps://", "https://")));
  };

  const FixedBottom = () => (
    <Button
      title="Открыть дом"
      onPress={() =>
        Alert.alert("Внимание", `Вы находитесь в ${route.distance} от дома. Пожалуйста, подъедьте к воротам, чтобы открыть его.`)
      }
    />
  );

  return (
    <Screen fixedBottom={<FixedBottom />}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <TickIcon size={30} />
        </View>
        <Text style={styles.intro}>Для вас забронирован дом на территории парка. Ждем вас!</Text>
      </View>
      <Text style={styles.title}>Дом</Text>
      <Block
        style={styles.block}
        title="Приморский дом"
        image="https://dizajn-interera.ru-land.com/sites/default/files/i/32419/4-11/646d958f7b8f.jpg"
      />
      <Text style={styles.title}>Как доехать</Text>
      <View style={styles.mapContainer}>
        {!isRouteReady && (
          <LottieView
            style={styles.loading}
            source={loadingAnimation}
            colorFilters={[{ keypath: "Shape Layer 2", color: "dodgerblue" }]}
            autoPlay
          />
        )}
        <Map style={styles.map} route={route} setRoute={setRoute} />
        <View style={styles.mapButtonContainer}>
          <SimpleButton style={styles.mapButton} onPress={openMap} title={routeDetails ? `Маршрут (${routeDetails})` : "Маршрут"} />
        </View>
      </View>
      <Text style={styles.description}>{Device.deviceName}</Text>
      <Text style={styles.title}>Важно знать</Text>
      <Text style={styles.description}>Чтобы открыть дом, подъедьте к нему, нажмите на кнопку и ворота автоматически открются.</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    // height: 200,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: "#f8f8f8",
  },
  intro: {
    ...globalStyles.intro,
    maxWidth: 350,
    textAlign: "center",
  },
  title: {
    ...globalStyles.title,
    marginBottom: 15,
  },
  block: {
    marginBottom: 15,
    height: 150,
  },
  mapContainer: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 10,
    height: 160,
  },
  loading: {
    position: "absolute",
    zIndex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  map: {
    flexShrink: 1,
  },
  mapButtonContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  mapButton: {
    width: "100%",
  },
  fixedBottom: {
    borderRadius: 10,
    backgroundColor: "white",
  },
  fixedBottomText: {
    ...globalStyles.description,
    marginTop: 5,
    textAlign: "center",
  },
});

export default BookingScreen;
