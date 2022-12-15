import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import api from "../api";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Work from "../components/Work";
import { groupWorksByDate, formatDate } from "../helpers/works";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const WorksScreen = ({ navigation }) => {
  const { cars, workTypes, works, setWorks } = useStore();

  const [car, setCar] = useState();
  const [workType, setWorkType] = useState();
  const [loading, setLoading] = useState(false);

  const fetchWorks = async () => {
    setLoading(true);

    const workTypes = await api.workTypes();

    // TODO: Возможно, при использовании в селекторе guid в качестве value, сразу использовать здесь state (без поиска).
    const carGuids = car ? cars.find((item) => item.key === car).guid : cars.map((item) => item.guid);
    const workTypeGuids = workType && workTypes.find(({ guid }) => guid === workType).guid;

    console.log({ carGuids, workTypeGuids });

    const worksResponse = await api.works({ carGuids, workTypeGuids });
    const data = worksResponse.map((item) => {
      item.name = workTypes.find((workType) => workType.guid === item.workTypeGuid).name;
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
        <Select style={styles.select} items={workTypes} value={workType} onChange={setWorkType} placeholder="Вид работ" />
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
    marginRight: 5,
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
