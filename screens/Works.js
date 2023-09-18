import { useEffect, useState } from "react";
import { AppState, StyleSheet, View, Text, ScrollView } from "react-native";

import api from "../api";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Spinner from "../components/Spinner";
import Work from "../components/Work";
import { screenHorizontalPadding } from "../constants/paddings";
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

    const works = worksResponse.map((item) => {
      item.name = workTypes.find((workType) => workType.guid === item.workTypeGuid).name;
      item.car = cars.find((car) => car.guid === item.carGuid);
      return item;
    });

    const workGuids = works.map((work) => work.guid);
    const workApprovalsResponse = await api.getWorkApprovals(workGuids);

    const workApprovalsByGuids = {};
    workApprovalsResponse.forEach((workApproval) => (workApprovalsByGuids[workApproval.guid] = workApproval));
    works.forEach((work) => workApprovalsByGuids[work.guid] && (work.approval = { createdAt: workApprovalsByGuids[work.guid].createdAt }));

    setWorks(works);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorks();
    const subscription = AppState.addEventListener("change", (state) => state === "active" && fetchWorks());
    return () => subscription.remove();
  }, [cars, car, workType]);

  return (
    <Screen
      style={{ paddingHorizontal: cars.length > 0 ? 0 : screenHorizontalPadding }}
      fixedBottom={<Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />}
    >
      {cars.length > 0 ? (
        <>
          <ScrollView
            style={styles.row}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: screenHorizontalPadding }}
          >
            <Select style={styles.select} items={cars} value={car} onChange={setCar} valueProp="guid" placeholder="Автомобиль" />
            <Select style={styles.select} items={workTypes} value={workType} onChange={setWorkType} valueProp="guid" placeholder="Работы" />
          </ScrollView>
          {loading ? (
            <Spinner style={{ position: "static", height: 400 }} />
          ) : (
            <View style={{ marginTop: 15, paddingHorizontal: screenHorizontalPadding }}>
              {groupedWorks.map((group) => (
                <View key={group[0].date}>
                  <Text style={styles.sectionTitle}>{formatDate(group[0].date)}</Text>
                  {group.map((work) => (
                    <Work key={work.guid} work={work} />
                  ))}
                </View>
              ))}
            </View>
          )}
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
