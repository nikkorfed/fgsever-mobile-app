import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import api from "../api";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Work from "../components/Work";
import { groupWorksByDate, formatDate } from "../helpers/works";
import { cars, worksResponse, workTypesResponse } from "../mocks";
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

    // const workResponse = await api.worksByCar(cars[0].guid);
    // const data = workResponse.data.value.map((item) => {
    const data = worksResponse.value.map((item) => {
      item.name = workTypes.find((workType) => workType.Ref_Key === item.workTypeGuid).Description;
      item.car = cars.find((car) => car.guid === item.carGuid);
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
      <Select style={styles.car} items={cars} value={car} onChange={setCar} placeholder="Все машины" />
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
