import { FontAwesome5 } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";
import moment from "moment";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";

import api from "../api";
import ImageViewer from "../components/ImageViewer";
import Pressable from "../components/Pressable";
import Screen from "../components/Screen";
import Spinner from "../components/Spinner";
import { screenHorizontalPadding } from "../constants/paddings";
import { getWorkIcon } from "../helpers/works";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const WorkScreen = ({ route, navigation }) => {
  const { guid } = route.params;

  const { cars, workTypes } = useStore();

  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});
  const [imageIndex, setImageIndex] = useState(null);
  const [photos, setPhotos] = useState([]);

  const Icon = getWorkIcon(work.name);

  const fetchData = async () => {
    setLoading(true);

    const work = await api.getWork(guid);
    navigation.setParams({ number: work.number });

    const hasPartNames = work.parts.every((item) => item.name);

    const workType = workTypes.find((workType) => workType.guid === work.workTypeGuid);
    work.name = workType.name;

    const [customer] = await api.customers([work.customerGuid]);
    work.customer = customer.name;

    const car = cars.find((car) => car.guid === work.carGuid);
    work.car = car;

    if (!hasPartNames) {
      const parts = await api.parts(work.parts.map((part) => part.guid));
      for (const part of parts) work.parts.find((item) => item.guid === part.guid).name = part.name;
    }

    const photos = await api.getPhotos(work.guid);
    photos.length && setPhotos(photos);

    setWork(work);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      setStatusBarStyle("light");
      return () => setStatusBarStyle("auto");
    }
  }, []);

  if (loading) return <Spinner />;

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon size={50} />
        </View>
        <Text style={styles.intro}>{work.name}</Text>
        <Text style={styles.introDescription}>{moment(work.date).format("lll")}</Text>
        {work.status && (
          <View style={styles.status}>
            {work.status === "В работе" && <FontAwesome5 style={styles.statusIcon} name="clock" color="orange" size={12} />}
            {work.status === "Выполнен" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
            <Text style={styles.text}>{work.status}</Text>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>
          Автомобиль <Text style={styles.titleAdditional}>{work.car.name}</Text>
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>VIN</Text>
          <Text style={styles.text}>{work.car.vin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Пробег</Text>
          <Text style={styles.text}>{work.mileage.toLocaleString()} км</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Модель</Text>
          <Text style={styles.text}>{work.car.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Обозначение кузова</Text>
          <Text style={styles.text}>{work.car.modelCode}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Дата производства</Text>
          <Text style={styles.text}>{work.car.productionDate}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Заказ</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Дата и время</Text>
          <Text style={styles.text}>{moment(work.date).format("lll")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Заказчик</Text>
          <Text style={styles.text}>{work.customer}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Услуги</Text>
          <Text style={styles.text}>{work.details}</Text>
        </View>
      </View>
      {photos.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Фотографии</Text>
          <View style={styles.photoColumns}>
            {photos.map((photo, index) => (
              <View key={photo.url} style={styles.photoColumn}>
                <Pressable onPress={() => setImageIndex(index)}>
                  <Image style={styles.photo} source={{ uri: photo.url }} />
                </Pressable>
              </View>
            ))}
          </View>
          <ImageViewer images={photos} setImages={setPhotos} imageIndex={imageIndex} setImageIndex={setImageIndex} />
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.title}>Работы</Text>
        {work.works.map((item, index) => (
          <View key={item.guid} style={index === work.works.length - 1 ? [styles.row, styles.lastRow] : styles.row}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.label}>
              {item.price.toLocaleString()} ₽ x {item.time.toLocaleString()} н/ч = {item.totalPrice.toLocaleString()} ₽
            </Text>
          </View>
        ))}
      </View>
      {work.parts?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.title}>Запчасти</Text>
          {work.parts.map((item, index) => (
            <View key={item.guid} style={index === work.parts.length - 1 ? [styles.row, styles.lastRow] : styles.row}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.label}>
                {item.price.toLocaleString()} ₽ x {item.quantity.toLocaleString()} шт. = {item.totalPrice.toLocaleString()} ₽
              </Text>
            </View>
          ))}
        </View>
      )}
      <View style={[styles.section, ...(work.recommendations.length > 0 ? [] : [styles.lastSection])]}>
        <Text style={styles.title}>Стоимость</Text>
        <View style={styles.row}>
          <View style={styles.price}>
            <Text style={styles.priceName}>Работы</Text>
            <Text style={styles.priceValue}>{work.worksPrice.toLocaleString()} ₽</Text>
          </View>
          <View style={[styles.price, styles.priceLast]}>
            <Text style={styles.priceName}>Запчасти</Text>
            <Text style={styles.priceValue}>{work.partsPrice.toLocaleString()} ₽</Text>
          </View>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <View style={[styles.price, styles.priceLast]}>
            <Text style={styles.priceName}>Общая стоимость</Text>
            <Text style={styles.priceValue}>{work.price.toLocaleString()} ₽</Text>
          </View>
        </View>
      </View>
      {work.recommendations.length > 0 && (
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.title}>Рекомендации</Text>
          <Text style={styles.text}>{work.recommendations}</Text>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  header: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 10,
    borderBottomWidth: 10,
    borderBottomColor: "#f8f8f8",
    paddingBottom: 15,
    paddingHorizontal: screenHorizontalPadding,
    backgroundColor: "white",
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
    ...globalStyles.title,
    textAlign: "center",
  },
  introDescription: {
    ...globalStyles.description,
    marginTop: 5,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f8f8f8",
  },
  statusIcon: { marginRight: 5 },
  section: {
    // marginBottom: 10,
    borderBottomWidth: 10,
    borderBottomColor: "#f8f8f8",
    paddingVertical: 15,
    paddingHorizontal: screenHorizontalPadding,
    backgroundColor: "white",
  },
  lastSection: {
    borderBottomWidth: 0,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 10,
  },
  titleAdditional: {
    ...globalStyles.title,
    color: "#888",
  },
  row: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  lastRow: {
    marginBottom: 0,
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    ...globalStyles.description,
  },
  text: {
    ...globalStyles.text,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  priceLast: {
    marginBottom: 0,
  },
  priceName: {
    ...globalStyles.text,
  },
  priceValue: {
    ...globalStyles.text,
    fontFamily: "Montserrat_600SemiBold",
  },
  totalCost: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  photoColumns: {
    ...globalStyles.columns,
    marginHorizontal: -2.5,
  },
  photoColumn: {
    ...globalStyles.column,
    flex: undefined,
    marginBottom: 5,
    paddingHorizontal: 2.5,
    width: "33.3%",
  },
  photo: {
    borderRadius: 5,
    paddingBottom: "75%",
    backgroundColor: "#f8f8f8",
  },
});

export default WorkScreen;
