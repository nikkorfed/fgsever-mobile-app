import { useHeaderHeight } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { AppState, StyleSheet, Platform, SectionList, View, Text, ScrollView } from "react-native";

import api from "../api";
import { Button } from "../components/Button";
import Select from "../components/Select";
import Spinner from "../components/Spinner";
import Work from "../components/Work";
import { screenHorizontalPadding } from "../constants/paddings";
import { groupWorksByDate, formatDate } from "../helpers/works";
import { useStore } from "../hooks/store";
import globalStyles from "../styles";

const pageSize = 10;

const WorksScreen = ({ navigation }) => {
  const { cars, workTypes, works, setWorks } = useStore();
  const groupedWorks = groupWorksByDate(works);

  const [car, setCar] = useState();
  const [workType, setWorkType] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const headerHeight = useHeaderHeight();
  const marginTop = Platform.OS === "android" ? headerHeight : 0;

  const fetchWorks = async ({ car, workType, limit, offset }) => {
    if (!cars.length) return [];

    const carGuids = car ? [car] : cars.map((item) => item.guid);
    const workTypeGuids = workType && [workType];

    const worksResponse = await api.works({ carGuids, workTypeGuids, limit, offset });

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

    return works;
  };

  const handleChangeFilters = async () => {
    setWorks([]);
    setLoading(true);

    const data = await fetchWorks({ car, workType, limit: pageSize, offset: 0 });
    data.length < pageSize ? setHasMore(false) : setHasMore(true);

    setWorks(data);
    setLoading(false);
    setOffset(data.length);
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    const data = await fetchWorks({ car, workType, limit: pageSize, offset: 0 });
    data.length < pageSize ? setHasMore(false) : setHasMore(true);

    setWorks(data);
    setRefreshing(false);
    setOffset(data.length);
  };

  const handleLoadMore = async () => {
    if (!works.length || !hasMore || loading) return;

    setLoading(true);

    const data = await fetchWorks({ car, workType, limit: pageSize, offset });
    data.length && setWorks((prev) => [...prev, ...data]);
    data.length < pageSize && setHasMore(false);

    setLoading(false);
    setOffset(works.length + data.length);
  };

  useEffect(() => {
    handleChangeFilters();
    const subscription = AppState.addEventListener("change", (state) => state === "active" && handleChangeFilters());
    return () => subscription.remove();
  }, [cars, car, workType]);

  return (
    <>
      <SectionList
        style={[styles.container, { marginTop }]}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 70 }}
        sections={groupedWorks}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          loading ? (
            <Spinner style={{ position: "static", height: 400 }} />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.description}>
                {cars.length > 0
                  ? "Работы по добавленным в гараж автомобилям не найдены в автосервисе."
                  : "Чтобы смотреть историю работ по автомобилям, добавьте их в гараже."}
              </Text>
            </View>
          )
        }
        ListHeaderComponent={
          cars.length > 0 && (
            <View style={styles.header}>
              <ScrollView
                style={styles.row}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: screenHorizontalPadding }}
              >
                <Select style={styles.select} items={cars} value={car} onChange={setCar} valueProp="guid" placeholder="Автомобиль" />
                <Select
                  style={styles.select}
                  items={workTypes}
                  value={workType}
                  onChange={setWorkType}
                  valueProp="guid"
                  placeholder="Работы"
                />
              </ScrollView>
            </View>
          )
        }
        ListFooterComponent={loading && works.length > 0 && <Spinner style={{ position: "static", height: 100 }} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{formatDate(section.date)}</Text>
          </View>
        )}
        renderItem={({ item }) => <Work style={styles.item} key={item.guid} work={item} />}
      />
      <View style={styles.fixedBottom}>
        <Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    backgroundColor: "white",
  },
  row: {
    ...globalStyles.row,
  },
  empty: {
    paddingHorizontal: screenHorizontalPadding,
  },
  header: {
    marginBottom: 15,
  },
  select: {
    marginRight: 5,
    height: 34,
  },
  section: {
    marginBottom: 15,
    paddingHorizontal: screenHorizontalPadding,
  },
  sectionTitle: {
    ...globalStyles.sectionTitle,
    lineHeight: 30,
  },
  item: {
    paddingHorizontal: screenHorizontalPadding,
  },
  block: {
    marginBottom: 10,
    shadowRadius: 0,
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: screenHorizontalPadding,
  },
});

export default WorksScreen;
