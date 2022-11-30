import { StyleSheet, Text } from "react-native";

import CodingIcon from "../assets/icons/coding.svg";
import MaintenanceIcon from "../assets/icons/maintenance.svg";
import RepairIcon from "../assets/icons/repair.svg";
import UpdateIcon from "../assets/icons/update.svg";
import UpgradeIcon from "../assets/icons/upgrade.svg";
import Screen from "../components/Screen";
import Work from "../components/Work";
import globalStyles from "../styles";

const WorkScreen = ({ navigation }) => {
  return (
    <Screen style={{ paddingTop: 10, paddingHorizontal: 20, backgroundColor: "white" }}>
      <Text style={styles.section}>Сегодня</Text>
      <Work
        icon={<MaintenanceIcon size={30} />}
        title="Техническое обслуживание"
        description="BMW X3, 76 600 км"
        price={24900}
        date={new Date()}
      />
      <Work icon={<UpgradeIcon size={30} />} title="Дооснащение" description="BMW X7, 123 000 км" price={145900} date={new Date()} />
      <Text style={styles.section}>Вчера</Text>
      <Work icon={<RepairIcon size={30} />} title="Ремонт двигателя" description="BMW 4, 18 500 км" price={76250} date={new Date()} />
      <Text style={styles.section}>8 ноября</Text>
      <Work icon={<CodingIcon size={30} />} title="Кодирование" description="BMW 4, 14 000 км" price={9000} date={new Date()} />
      <Work icon={<UpdateIcon size={30} />} title="Обновление ПО" description="BMW M5, 23 000 км" price={4800} date={new Date()} />
      <Work
        icon={<MaintenanceIcon size={30} />}
        title="Техническое обслуживание"
        description="BMW X7, 115 000 км"
        price={24900}
        date={new Date()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
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
