import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import api from "../api";
import CodingIcon from "../assets/icons/coding.svg";
import EngineIcon from "../assets/icons/engine.svg";
import MaintenanceIcon from "../assets/icons/maintenance.svg";
import UpdateIcon from "../assets/icons/update.svg";
import UpgradeIcon from "../assets/icons/upgrade.svg";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Work from "../components/Work";
import { groupWorksByDate, formatDate } from "../helpers/works";
import { cars, works as worksMocks, worksResponse, workTypesResponse } from "../mocks";
import globalStyles from "../styles";

const WorksScreen = ({ navigation }) => {
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([]);

  const fetchWorks = async () => {
    setLoading(true);

    // const workTypesResponse = await api.workTypes();
    // const workTypes = workTypesResponse.data.value;
    const workTypes = workTypesResponse.value;

    // const workResponse = await api.workByCar(cars[0].guid);
    // const data = workResponse.data.value.map((item) => ({
    const data = worksResponse.value.map((item) => ({
      guid: item.Ref_Key,
      title: workTypes.find((workType) => workType.Ref_Key === item.ВидРемонта_Key).Description,
      carGuid: item.Автомобиль_Key,
      mileage: +item.Пробег,
      price: item.СуммаДокумента,
      date: item.Date,
    }));
    setWorks(groupWorksByDate(data, "date"));
    setLoading(false);
  };

  useEffect(() => {
    fetchWorks();
  }, [car]);

  return (
    <Screen
      style={{ paddingHorizontal: 20 }}
      fixedBottom={<Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />}
      loading={loading}
    >
      <Select style={styles.car} items={cars} value={car} onChange={setCar} placeholder="Все машины" />
      {works.map((group) => (
        <View key={group[0].date}>
          <Text style={styles.section}>{formatDate(group[0].date)}</Text>
          {group.map((work) => (
            <Work
              key={work.guid}
              title={work.title}
              description={`${cars.find(({ guid }) => guid === work.carGuid).label}, ${work.mileage.toLocaleString()} км`}
              price={work.price}
              date={work.date}
              onPress={() => navigation.navigate("Work", { workId: work.id })}
            />
          ))}
        </View>
      ))}
      <Text style={styles.section}>Сегодня</Text>
      {worksMocks.map((work) => (
        <Work
          key={work.id}
          icon={work.icon}
          title={work.title}
          description={`${cars.find(({ guid }) => guid === work.carGuid).label}, ${work.mileage.toLocaleString()} км`}
          price={work.price}
          date={work.date}
          onPress={() => navigation.navigate("Work", { workId: work.id })}
        />
      ))}
      <Text style={styles.section}>Вчера</Text>
      <Work
        icon={<EngineIcon size={30} />}
        title="Ремонт двигателя"
        description="BMW 4, 18 500 км"
        price={76250}
        date={new Date()}
        onPress={() => navigation.navigate("Work", { workId: 43 })}
      />
      <Text style={styles.section}>8 ноября</Text>
      <Work
        icon={<CodingIcon size={30} />}
        title="Кодирование"
        description="BMW 4, 14 000 км"
        price={9000}
        date={new Date()}
        onPress={() => navigation.navigate("Work", { workId: 67 })}
      />
      <Work
        icon={<UpdateIcon size={30} />}
        title="Обновление ПО"
        description="BMW M5, 23 000 км"
        price={4800}
        date={new Date()}
        onPress={() => navigation.navigate("Work", { workId: 80 })}
      />
      <Work
        icon={<MaintenanceIcon size={30} />}
        title="Техническое обслуживание"
        description="BMW X7, 115 000 км"
        price={24900}
        date={new Date()}
        onPress={() => navigation.navigate("Work", { workId: 95 })}
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

export default WorksScreen;
