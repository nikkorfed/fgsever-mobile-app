import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Alert, Image, TouchableHighlight } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import MaskInput from "react-native-mask-input";
import axios from "axios";
import mime from "mime";

import Block from "../components/Block";
import { Button } from "../components/Button";
import Carousel from "../components/Carousel";
import DateTimePicker from "../components/DateTimePicker";
import Screen from "../components/Screen";
import Select from "../components/Select";
import { screenHorizontalPadding } from "../constants/paddings";
import { useStore } from "../hooks/store";
import { models, services } from "../mocks";
import globalStyles from "../styles";
import api from "../api";

const AppointmentScreen = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const { cars } = useStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [car, setCar] = useState(cars[0]?.guid);
  const [service, setService] = useState();
  const [date, setDate] = useState();
  const [problem, setProblem] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .carCustomers(cars[0]?.guid)
      .then((d) => {
        setName(d[0].name);
      })
      .catch((e) => {
        Alert.alert(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addFile = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Premission granted");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
      });
      if (!result.cancelled) {
        if (result?.selected?.length) {
          setImages(result.selected);
        } else {
          setImages([result]);
        }
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const selectedCar = cars.find((item) => item.guid === car);
    const carData = selectedCar
      ? [
          ["Модель:", selectedCar.model],
          ["VIN:", selectedCar.vin],
          ["Обозначение кузова:", selectedCar.modelCode],
          ["Дата производства:", selectedCar.productionDate],
        ]
      : [["Модель:", models.find((item) => item.key === car).name]];
    const serviceData = services.find((item) => item.key === service).name;
    const data = { name, phone, car: carData[0][0], service: serviceData, date: Date.now(date), problem };

    // await api.appointment(data);

    const formData = new FormData();
    const sendFileData = images.map((item, index) => {
      const fileUri = item.uri;
      const newFileeUri = "file:///" + fileUri.split("file:/").join("");
      formData.append(`image-${index}`, {
        uri: fileUri,
        type: mime.getType(fileUri),
        name: newFileeUri.split("/").pop(),
      });
    });

    formData.append("data", JSON.stringify(data));

    axios({
      method: "post",
      url: "http://10.0.2.2:3002/defectfile",
      data: formData,
      headers: { Accept: "application/json", "Content-Type": "multipart/form-data" },
    }).catch((e) => {
      Alert.alert(e.response.data);
    });

    setLoading(false);
    setSuccess(true);
  };

  const handleBack = async () => {
    navigation.goBack();
  };

  return (
    <Screen
      style={{ paddingHorizontal: 0 }}
      fixedBottom={<Button title={success ? "Готово" : "Отправить"} onPress={success ? handleBack : handleSubmit} />}
      fixedBottomStyle={{ bottom }}
      loading={loading}
    >
      {success && (
        <View style={styles.overlay}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="check" color="#333" size={40} />
          </View>
          <Text style={styles.title}>Заявка отправлена</Text>
          <Text style={styles.description}>
            Ваша заявка отправлена. Наш менеджер перезвонит вам в рабочее время (9:00 — 20:00) для уточнения деталей и записи на ремонт.
          </Text>
        </View>
      )}
      <View style={{ paddingHorizontal: screenHorizontalPadding }}>
        <Text style={styles.intro}>
          Укажите свои контакты, выберите автомобиль, необходимый вид работ и дату посещения, чтобы записаться на ремонт
        </Text>
        <Text style={styles.title}>Ваше имя</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Фамилия, имя и отчество"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.title}>Телефон</Text>
        <MaskInput
          style={styles.input}
          value={phone}
          onFocus={() => !phone && setPhone("+7")}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          mask={["+", "7", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
          placeholder="+7 (900) 000-00-00"
          placeholderTextColor="#aaa"
        />
        <Text style={styles.title}>Автомобиль</Text>
      </View>
      {cars.length > 0 ? (
        <Carousel>
          {cars.map((item) => (
            <Block
              key={item.key}
              style={styles.block}
              image={item.image}
              imageStyle={styles.blockImage}
              imageResizeMode="contain"
              title={item.name}
              descriptionStyle={styles.blockDescription}
              selected={item.guid === car}
              onPress={() => setCar(item.guid)}
            />
          ))}
        </Carousel>
      ) : (
        <View style={{ paddingHorizontal: screenHorizontalPadding }}>
          <Select style={styles.selectInput} items={models} value={car} onChange={setCar} placeholder="Выберите автомобиль" />
        </View>
      )}
      <View style={{ paddingHorizontal: screenHorizontalPadding }}>
        <Text style={styles.title}>Вид работ</Text>
        <Select style={styles.selectInput} items={services} value={service} onChange={setService} placeholder="Выберите услугу" />
        <Text style={styles.title}>Дата посещения</Text>
        <DateTimePicker style={styles.selectInput} value={date} onChange={setDate} />
        <Text style={styles.title}>Описание проблемы</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.multilineInput}
          value={problem}
          onChangeText={setProblem}
          placeholder="Опишите возникшую неисправность"
          placeholderTextColor="#aaa"
        />
        <View style={styles.filePreviewContainer}>
          {images.length > 0 && images.map((image) => <Image key={image.uri} source={{ uri: image.uri }} style={styles.filePreview} />)}
          <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={styles.addImageButton} onPress={addFile}>
            <Feather name="plus" size={35} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    padding: 15,
    backgroundColor: "white",
  },
  iconContainer: {
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
    marginBottom: 15,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 15,
  },
  description: {
    ...globalStyles.description,
    textAlign: "center",
  },
  text: {
    ...globalStyles.text,
    marginBottom: 15,
  },
  block: {
    marginBottom: 15,
    justifyContent: "flex-end",
    shadowRadius: 0,
    backgroundColor: "white",
  },
  blockImage: {
    margin: 5,
  },
  blockDescription: {
    marginTop: 0,
    marginBottom: -5,
  },
  input: {
    ...globalStyles.input,
    marginBottom: 15,
  },
  selectInput: {
    marginBottom: 15,
  },
  multilineInput: {
    ...globalStyles.input,
    height: 80,
    textAlignVertical: "top",
  },
  filePreview: {
    width: 90,
    height: 90,
    margin: 15,
    marginLeft: 5,
    borderRadius: 20,
  },
  filePreviewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  addImageButton: {
    width: 90,
    height: 90,
    margin: 15,
    marginLeft: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppointmentScreen;
