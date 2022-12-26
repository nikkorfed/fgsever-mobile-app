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
  const groupedWorks = groupWorksByDate(works);

  const [car, setCar] = useState();
  const [workType, setWorkType] = useState();
  const [loading, setLoading] = useState(false);

  const fetchWorks = async () => {
    if (!cars.length) return;

    setLoading(true);

    const carGuids = car ? [car] : cars.map((item) => item.guid);
    const workTypeGuids = workType && [workType];
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
  }, [cars, car, workType]);

  return (
    <Screen fixedBottom={<Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />} loading={loading}>
      {cars.length > 0 ? (
        <>
          <View style={styles.row}>
            <Select style={styles.select} items={cars} value={car} onChange={setCar} valueProp="guid" placeholder="Автомобиль" />
            <Select
              style={styles.select}
              items={workTypes}
              value={workType}
              onChange={setWorkType}
              valueProp="guid"
              placeholder="Вид работ"
            />
          </View>
          {groupedWorks.map((group, groupIndex) => (
            <View key={group[0].date}>
              <Text style={styles.sectionTitle}>{formatDate(group[0].date)}</Text>
              {group.map((work, workIndex) => {
                const last = groupIndex === groupedWorks.length - 1 && workIndex === group.length - 1;
                return (
                  <Work
                    key={work.guid}
                    style={last && { marginBottom: 0 }}
                    status={work.status}
                    name={work.name}
                    date={work.date}
                    car={work.car}
                    mileage={work.mileage}
                    price={work.price}
                    onPress={() => navigation.navigate("Work", { work })}
                  />
                );
              })}
            </View>
          ))}
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.description}>Чтобы смотреть историю работ по автомобилям, добавьте их в гараже.</Text>
        </View>
      )}
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
  sectionTitle: {
    ...globalStyles.sectionTitle,
    marginBottom: 15,
    lineHeight: 30,
  },
  block: {
    marginBottom: 10,
    shadowRadius: 0,
  },
});

export default WorksScreen;
