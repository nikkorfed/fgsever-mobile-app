import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import api from "../api";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Work from "../components/Work";
import { groupWorksByDate, formatDate } from "../helpers/works";
import { cars } from "../mocks";
import globalStyles from "../styles";

const WorksScreen = ({ navigation }) => {
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(false);
  const [works, setWorks] = useState([]);

  const fetchWorks = async () => {
    setLoading(true);

    const workTypes = await api.workTypes();

    const carGuids = car ? cars.find((item) => item.key === car).guid : cars.map((item) => item.guid);
    const worksResponse = await api.worksByCar(carGuids);
    const data = worksResponse.map((item) => {
      item.name = workTypes.find((workType) => workType.Ref_Key === item.workTypeGuid).Description;
      item.car = cars.find((car) => car.guid === item.carGuid);
      return item;
    });
    setWorks(data);
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
      <View style={styles.row}>
        <Select style={styles.select} items={cars} value={car} onChange={setCar} placeholder="Автомобиль" />
      </View>
      {groupWorksByDate(works, "date").map((group) => (
        <View key={group[0].date}>
          <Text style={styles.section}>{formatDate(group[0].date)}</Text>
          {group.map((work) => (
            <Work
              key={work.guid}
              status={work.status}
              name={work.name}
              date={work.date}
              car={work.car}
              mileage={work.mileage}
              price={work.price}
              onPress={() => navigation.navigate("Work", { work })}
            />
          ))}
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  row: {
    ...globalStyles.row,
    marginBottom: 15,
  },
  select: {
    height: 34,
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
