import moment from "moment";

import BodyRepairIcon from "../assets/icons/body-repair.svg";
import CodingIcon from "../assets/icons/coding.svg";
import DiagnosticsIcon from "../assets/icons/diagnostics.svg";
import EngineIcon from "../assets/icons/engine.svg";
import MaintenanceIcon from "../assets/icons/maintenance.svg";
import UpdateIcon from "../assets/icons/update.svg";
import UpgradeIcon from "../assets/icons/upgrade.svg";

export const prepareWorkType = (item) => ({
  guid: item.Ref_Key,
  name: getWorkName(item.Description),
});

export const prepareWork = (item) => ({
  guid: item.Ref_Key,
  number: item.Number,
  status: getWorkStatus(item.Состояние),
  workTypeGuid: item.ВидРемонта_Key,
  date: item.Date,
  carGuid: item.Автомобиль_Key,
  mileage: +item.Пробег,
  customerGuid: item.Заказчик_Key,
  details: item.СписокНоменклатуры,
  worksPrice: item.СуммаРаботДокумента,
  partsPrice: item.СуммаНоменклатурыДокумента,
  price: item.СуммаДокумента,
  works: item.Работы.map((work) => ({
    guid: work.Номенклатура_Key,
    name: work.Содержание,
    price: work.Цена,
    quantity: work.Количество,
    time: work.Коэффициент,
    totalPrice: work.Сумма,
  })),
  parts: item.Запасы.map((work) => ({
    guid: work.Номенклатура_Key,
    name: work.Содержание,
    price: work.Цена,
    quantity: work.Количество,
    totalPrice: work.Сумма,
  })),
  warranty: item.Гарантии,
  recommendations: item.Рекомендации,
});

export const groupWorksByDate = (items) => {
  const result = [];

  items.map((work) => {
    const latestGroup = result[result.length - 1];
    const latestItem = latestGroup && latestGroup[latestGroup.length - 1];

    if (!latestGroup || !moment(latestItem.date).isSame(work.date, "day")) result.push([work]);
    else latestGroup.push(work);
  });

  return result;
};

export const formatDate = (date) => {
  const value = moment(date);

  if (value.isSame(moment(), "day")) return "Сегодня";
  else if (value.isSame(moment().subtract(1, "day"), "day")) return "Вчера";
  else if (value.isSame(moment(), "year")) return moment(date).format("D MMMM");
  else return moment(date).format("D MMMM YYYY");
};

export const getWorkIcon = (title) => (props) =>
  ((title === "Слесарный ремонт" || title === "Установка") && <MaintenanceIcon {...props} />) ||
  (title === "Дооснащение" && <UpgradeIcon {...props} />) ||
  (title === "Кодирование" && <CodingIcon {...props} />) ||
  (title === "Диагностика" && <DiagnosticsIcon {...props} />) ||
  (title === "Обновление ПО" && <UpdateIcon {...props} />) ||
  (title === "Ремонт двигателя" && <EngineIcon {...props} />) ||
  ((title === "Кузовной" || title === "Покраска") && <BodyRepairIcon {...props} />);

export const getWorkName = (value) => (value === "Слесарный" && "Слесарный ремонт") || value;

export const getWorkStatus = (value) =>
  (value === "Заявка" && "Принят") || (value === "ВРаботе" && "В работе") || (value === "Закрыт" && "Выполнен") || value;
