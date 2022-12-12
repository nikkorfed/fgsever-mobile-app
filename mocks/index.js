import moment from "moment";

export const cars = [
  {
    id: 1,
    key: "X4XJA19490WC06112",
    guid: "4d08d576-1d22-11e8-8632-2c4d54ee8471",
    label: "BMW 5",
    image: "https://fgsever.ru/images/models/5-series/g30.png",
    licensePlate: "А001АА799",
    vin: "X4XJA19490WC06112",
    model: "520I A",
    modelCode: "G30",
    productionDate: "11.12.2017",
  },
  {
    id: 2,
    key: "X4XCW89470LK66987",
    guid: "f625ad63-e764-11ea-9cee-6045cb9e7b38",
    label: "BMW X7",
    image: "https://fgsever.ru/images/models/x7/g07.png",
    licensePlate: "А002АА799",
    vin: "X4XCW89470LK66987",
    model: "X7 xDrive30d",
    modelCode: "G07",
    productionDate: "29.12.2019",
  },
  {
    id: 3,
    key: "WBSAE01030CD34246",
    guid: "795c8281-7458-11ec-a0fa-244bfe7c403a",
    label: "BMW M8",
    image: "https://fgsever.ru/images/models/8-series/g15.png",
    licensePlate: "М008КА197",
    vin: "WBSAE01030CD34246",
    model: "M8",
    modelCode: "F92",
    productionDate: "22.04.2021",
  },
];

export const services = [
  { id: 1, key: "maintenance", label: "Техническое обслуживание" },
  { id: 2, key: "upgrade", label: "Дооснащение" },
  { id: 3, key: "repair", label: "Ремонт" },
  { id: 4, key: "update", label: "Обновление ПО" },
  { id: 5, key: "coding", label: "Кодирование" },
];

export const work = [
  {
    id: 123,
    type: "maintenance",
    title: "Техническое обслуживание",
    carGuid: "4d08d576-1d22-11e8-8632-2c4d54ee8471",
    mileage: 76600,
    price: 24900,
    date: moment(),
  },
  {
    id: 234,
    type: "upgrade",
    title: "Дооснащение",
    carGuid: "f625ad63-e764-11ea-9cee-6045cb9e7b38",
    mileage: 123000,
    price: 145900,
    date: moment(),
  },
];
