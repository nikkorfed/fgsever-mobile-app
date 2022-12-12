import axios from "axios";
import { encode } from "js-base64";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import CodingIcon from "../assets/icons/coding.svg";
import EngineIcon from "../assets/icons/engine.svg";
import MaintenanceIcon from "../assets/icons/maintenance.svg";
import UpdateIcon from "../assets/icons/update.svg";
import UpgradeIcon from "../assets/icons/upgrade.svg";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Work from "../components/Work";
import { cars, work as workMocks, workResponse, workTypesResponse } from "../mocks";
import globalStyles from "../styles";

const groupWorkByDate = (items) => {
  const result = [];

  items.map((work) => {
    const latestGroup = result[result.length - 1];
    const latestItem = latestGroup && latestGroup[latestGroup.length - 1];

    if (!latestGroup || !moment(latestItem.date).isSame(work.date, "day")) result.push([work]);
    else latestGroup.push(work);
  });

  return result;
};

const formatDate = (date) => {
  const value = moment(date);

  if (value.isSame(moment(), "day")) return "Сегодня";
  else if (value.isSame(moment().subtract(1, "day"), "day")) return "Вчера";
  else if (value.isSame(moment(), "year")) return moment(date).format("D MMMM");
  else return moment(date).format("D MMMM YYYY");
};

const WorkScreen = ({ navigation }) => {
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState([]);

  const fetchWork = async () => {
    setLoading(true);

    // const workTypesResponse = await axios.get(
    //   `http://213.109.27.99:27/AutoserviceFgsever/odata/standard.odata/Catalog_%D0%B0%D1%81%D0%92%D0%B8%D0%B4%D1%8B%D0%A0%D0%B5%D0%BC%D0%BE%D0%BD%D1%82%D0%B0?$format=json`,
    //   { headers: { Authorization: `Basic ${encode("КурочкинМ:789")}` } }
    // );
    // const workTypes = workTypesResponse.data.value;
    const workTypes = workTypesResponse.value;

    // const workResponse = await axios.get(
    //   `http://213.109.27.99:27/AutoserviceFgsever/odata/standard.odata/Document_асЗаказНаряд?$filter=Автомобиль_Key eq guid'${cars[0].guid}'&$orderby=Date desc&$format=json`,
    //   { headers: { Authorization: `Basic ${encode("КурочкинМ:789")}` } }
    // );
    // const data = workResponse.data.value.map((item) => ({
    const data = workResponse.value.map((item) => ({
      guid: item.Ref_Key,
      title: workTypes.find((workType) => workType.Ref_Key === item.ВидРемонта_Key).Description,
      carGuid: item.Автомобиль_Key,
      mileage: +item.Пробег,
      price: item.СуммаДокумента,
      date: item.Date,
    }));
    setWork(groupWorkByDate(data, "date"));
    setLoading(false);
  };

  useEffect(() => {
    fetchWork();
  }, [car]);

  return (
    <Screen
      style={{ paddingHorizontal: 20 }}
      fixedBottom={<Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />}
      loading={loading}
    >
      <Select style={styles.car} items={cars} value={car} onChange={setCar} placeholder="Все машины" />
      {work.map((group) => (
        <View key={group[0].date}>
          <Text style={styles.section}>{formatDate(group[0].date)}</Text>
          {group.map((work) => (
            <Work
              key={work.guid}
              title={work.title}
              description={`${cars.find(({ guid }) => guid === work.carGuid).label}, ${work.mileage.toLocaleString()} км`}
              price={work.price}
              date={work.date}
              onPress={() => navigation.navigate("WorkDetails", { workId: work.id })}
            />
          ))}
        </View>
      ))}
      <Text style={styles.section}>Сегодня</Text>
      {workMocks.map((work) => (
        <Work
          key={work.id}
          icon={work.icon}
          title={work.title}
          description={`${cars.find(({ guid }) => guid === work.carGuid).label}, ${work.mileage.toLocaleString()} км`}
          price={work.price}
          date={work.date}
          onPress={() => navigation.navigate("WorkDetails", { workId: work.id })}
        />
      ))}
      <Text style={styles.section}>Вчера</Text>
      <Work
        icon={<EngineIcon size={30} />}
        title="Ремонт двигателя"
        description="BMW 4, 18 500 км"
        price={76250}
        date={new Date()}
        onPress={() => navigation.navigate("WorkDetails", { workId: 43 })}
      />
      <Text style={styles.section}>8 ноября</Text>
      <Work
        icon={<CodingIcon size={30} />}
        title="Кодирование"
        description="BMW 4, 14 000 км"
        price={9000}
        date={new Date()}
        onPress={() => navigation.navigate("WorkDetails", { workId: 67 })}
      />
      <Work
        icon={<UpdateIcon size={30} />}
        title="Обновление ПО"
        description="BMW M5, 23 000 км"
        price={4800}
        date={new Date()}
        onPress={() => navigation.navigate("WorkDetails", { workId: 80 })}
      />
      <Work
        icon={<MaintenanceIcon size={30} />}
        title="Техническое обслуживание"
        description="BMW X7, 115 000 км"
        price={24900}
        date={new Date()}
        onPress={() => navigation.navigate("WorkDetails", { workId: 95 })}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  car: {
    marginBottom: 15,
  },
  section: {
    ...globalStyles.section,
    marginBottom: 15,
    lineHeight: 30,
  },
  block: {
    marginBottom: 10,
    shadowRadius: 0,
  },
});

export default WorkScreen;
