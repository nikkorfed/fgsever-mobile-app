import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";
import moment from "moment";
import { useState, useEffect } from "react";
import { AppState, StyleSheet, Alert, Platform, RefreshControl, View, Text, Image } from "react-native";

import api from "../api";
import { Button } from "../components/Button";
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
  const [refreshing, setRefreshing] = useState(false);
  const [work, setWork] = useState({});
  const [imageIndex, setImageIndex] = useState(null);
  const [photos, setPhotos] = useState([]);

  const Icon = getWorkIcon(work.name);

  const fetchData = async () => {
    const work = await api.getWork(guid);
    navigation.setParams({ number: work.number });

    const hasPartNames = work.parts.every((item) => item.name);

    const workType = workTypes.find((workType) => workType.guid === work.workTypeGuid);
    work.name = workType.name;

    const workApproval = await api.getWorkApproval(work.guid);
    work.approval = workApproval;

    const requests = await api.getRequests({ refType: "work", refGuid: work.guid });
    const testDrive = requests.find((request) => request.type === "testDrive");
    const carWash = requests.find((request) => request.type === "carWash");
    (work.testDrive = testDrive), (work.carWash = carWash);

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
  };

  const handleFetch = async (silent = false) => {
    if (!silent) setLoading(true);
    await fetchData();
    if (!silent) setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(true);
    setRefreshing(false);
  };

  const handleRespondTestDrive = (value) => async () => {
    setLoading(true);
    const testDriveRequest = await api.updateRequest(work.testDrive.guid, { status: value });
    if (testDriveRequest) await handleFetch();
  };

  const handleClickCarWash = async () => {
    Alert.alert("Мойка автомобиля", "Вы уверены, что нужно помыть автомобиль?", [
      { text: "Отмена" },
      { text: "Помыть", onPress: handleRequestCarWash, isPreferred: true },
    ]);
  };

  const handleRequestCarWash = async () => {
    setLoading(true);
    const carWashRequest = await api.createRequest({ refType: "work", refGuid: work.guid, status: "pending", type: "carWash" });
    if (carWashRequest) await handleFetch();
  };

  const handleApproveWork = async () => {
    setLoading(true);
    await api.addWorkApproval(work.guid);
    await handleFetch();
  };

  useEffect(() => {
    handleFetch();
    const subscription = AppState.addEventListener("change", (state) => state === "active" && handleFetch(true));
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      setStatusBarStyle("light");
      return () => setStatusBarStyle("auto");
    }
  }, []);

  if (loading) return <Spinner />;

  return (
    <Screen style={{ paddingHorizontal: 0 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Icon size={50} />
        </View>
        <Text style={styles.headerTitle}>{work.name}</Text>
        <Text style={styles.headerDescription}>{moment(work.date).format("lll")}</Text>
        {work.status && (
          <View style={styles.status}>
            {work.status === "Согласование" && work.approval && (
              <FontAwesome5 style={styles.statusIcon} name="check" color="dodgerblue" size={10} />
            )}
            {work.status === "Ожидание" && <FontAwesome5 style={styles.statusIcon} name="clock" color="orange" size={12} />}
            {work.status === "В работе" && (
              <MaterialCommunityIcons style={styles.statusIcon} name="progress-clock" color="dodgerblue" size={14} />
            )}
            {work.status === "Выполнен" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
            {work.status === "Закрыт" && <FontAwesome5 style={styles.statusIcon} name="check" color="green" size={12} />}
            <Text style={styles.text}>{work.status === "Согласование" && work.approval ? "Согласовано" : work.status}</Text>
          </View>
        )}
        {work.status !== "Выполнен" && work.status !== "Закрыт" && !work.carWash && (
          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={handleClickCarWash}>
              <View style={styles.buttonIcon}>
                <MaterialCommunityIcons name="car-wash" color="white" size={22} />
              </View>
              <Text style={styles.buttonText}>Запросить мойку</Text>
            </Pressable>
          </View>
        )}
      </View>
      {work.status !== "Выполнен" && work.status !== "Закрыт" && work.testDrive?.status === "pending" && (
        <View style={styles.section}>
          <Text style={[styles.titleContainer, styles.title]}>Тест-драйв</Text>
          <Text style={styles.text}>Для проверки выполненных работ мастеру необходима тестовая поездка на автомобиле.</Text>
          <View style={styles.requestButtons}>
            <View style={styles.requestButton}>
              <Button style={styles.requestRejectButton} title="Не нужно" onPress={handleRespondTestDrive("rejected")} />
            </View>
            <View style={styles.requestButton}>
              <Button title="Разрешить" onPress={handleRespondTestDrive("approved")} />
            </View>
          </View>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.title}>
          Автомобиль
          {/* Автомобиль <Text style={styles.titleAdditional}>{work.car.name}</Text> */}
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Модель</Text>
          <Text style={styles.text}>{work.car.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>VIN</Text>
          <Text style={styles.text}>{work.car.vin}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Пробег</Text>
          <Text style={styles.text}>{work.mileage.toLocaleString()} км</Text>
        </View>
        {/* <View style={styles.row}>
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
        </View> */}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Заказ</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Дата и время</Text>
          <Text style={styles.text}>{moment(work.date).format("lll")}</Text>
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Заказчик</Text>
          <Text style={styles.text}>{work.customer}</Text>
        </View>
        {/* <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.label}>Услуги</Text>
          <Text style={styles.text}>{work.details}</Text>
        </View> */}
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
        {work.status === "Согласование" && !work.approval && (
          <Button style={styles.approveButton} title="Согласовать" onPress={handleApproveWork} />
        )}
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
  headerIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: "#f8f8f8",
  },
  headerTitle: {
    ...globalStyles.title,
    textAlign: "center",
  },
  headerDescription: {
    ...globalStyles.description,
    marginTop: 5,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    alignItems: "center",
    marginHorizontal: 15,
    width: 80,
  },
  buttonIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: "dodgerblue",
  },
  buttonText: {
    ...globalStyles.text,
    fontSize: 12,
    textAlign: "center",
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
  requestButtons: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: -5,
  },
  requestButton: {
    flex: 1,
    paddingHorizontal: 5,
  },
  requestRejectButton: {
    color: "dodgerblue",
    backgroundColor: "#f8f8f8",
  },
  approveButton: {
    marginTop: 5,
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
