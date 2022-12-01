import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import CodingIcon from "../assets/icons/coding.svg";
import EngineIcon from "../assets/icons/engine.svg";
import MaintenanceIcon from "../assets/icons/maintenance.svg";
import UpdateIcon from "../assets/icons/update.svg";
import UpgradeIcon from "../assets/icons/upgrade.svg";
import { Button } from "../components/Button";
import Screen from "../components/Screen";
import Select from "../components/Select";
import Work from "../components/Work";
import { cars } from "../mocks";
import globalStyles from "../styles";

const WorkScreen = ({ navigation }) => {
  const [car, setCar] = useState();

  return (
    <Screen
      style={{ paddingHorizontal: 20 }}
      fixedBottom={<Button title="Записаться" onPress={() => navigation.navigate("Appointment")} />}
    >
      <Select style={styles.car} items={cars} value={car} onChange={setCar} placeholder="Все машины" />
      <Text style={styles.section}>Сегодня</Text>
      <Work
        icon={<MaintenanceIcon size={30} />}
        title="Техническое обслуживание"
        description="BMW X3, 76 600 км"
        price={24900}
        date={new Date()}
        onPress={() => navigation.navigate("WorkDetails", { workId: 123 })}
      />
      <Work
        icon={<UpgradeIcon size={30} />}
        title="Дооснащение"
        description="BMW X7, 123 000 км"
        price={145900}
        date={new Date()}
        onPress={() => navigation.navigate("WorkDetails", { workId: 234 })}
      />
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
  },
  block: {
    marginBottom: 10,
    shadowRadius: 0,
  },
});

export default WorkScreen;
