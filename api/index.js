import axios from "axios";
import { encode } from "js-base64";
import { uniqBy } from "lodash";

import { prepareCar } from "../helpers/cars";
import { prepareCustomer } from "../helpers/customer";
import { preparePart } from "../helpers/parts";
import { prepareWorkType, prepareWork } from "../helpers/works";
// import { carsResponse, worksResponse, workTypesResponse, partsResponse } from "../mocks";

const serializer = (params) => {
  const entries = Object.entries(params);
  return entries.map(([key, value]) => `${key}=${value}`).join("&");
};

const oDataApi = axios.create({
  baseURL: "http://213.109.27.99:8080/Autoservice/odata/standard.odata/",
  headers: { Authorization: `Basic ${encode("приложение:bmwf30")}` },
  params: { $format: "json" },
  paramsSerializer: { serialize: serializer },
});

const appointment = async (data) => {
  const response = await axios.post("https://fgsever.ru/scripts/php/appointment.php", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const carInfo = async (vin) => {
  const response = await axios.post("https://fgsever.ru/scripts/php/calculators/car-info.php", null, { params: { vin } });
  return response.data;
};

const carGuid = async (vin) => {
  // return carsResponse.value.map(prepareCar)[0];

  const response = await oDataApi.get("/Catalog_асАвтомобили", { params: { $filter: `like(VIN,'%${vin}')` } });
  return response.data.value.map(prepareCar)[0];
};

const carCustomers = async (carGuid) => {
  const carFilter = `Автомобиль_Key eq guid'${carGuid}'`;
  const worksResponse = await oDataApi.get(`/Document_асЗаказНаряд`, {
    params: { $filter: carFilter, $select: "Заказчик_Key", $orderby: "Date desc" },
  });

  let customers = worksResponse.data.value.map((item) => ({ guid: item.Заказчик_Key }));
  customers = uniqBy(customers, "guid");

  const customersFilter = customers.map(({ guid }) => `Ref_Key eq guid'${guid}'`).join(" or ");
  const customersResponse = await oDataApi.get("/Catalog_Контрагенты", { params: { $filter: customersFilter } });

  for (const customer of customersResponse.data.value) customers.find((item) => item.guid === customer.Ref_Key).name = customer.Description;
  return customers;
};

const workTypes = async () => {
  // return workTypesResponse.value.map(prepareWorkType);

  const response = await oDataApi.get("/Catalog_асВидыРемонта");
  return response.data.value.map(prepareWorkType);
};

const works = async ({ carGuids, workTypeGuids = [] }) => {
  // return worksResponse.value.map(prepareWork);

  const carsFilter = carGuids.map((guid) => `Автомобиль_Key eq guid'${guid}'`).join(" or ");
  const workTypeFilter = workTypeGuids.map((guid) => `ВидРемонта_Key eq guid'${guid}'`).join(" or ");

  let filters = [carsFilter, workTypeFilter].filter((i) => i);
  filters.length > 1 && (filters = filters.map((filter) => `(${filter})`));
  filters = filters.join(" and ");

  const response = await oDataApi.get(`/Document_асЗаказНаряд`, { params: { $filter: filters, $orderby: "Date desc" } });
  return response.data.value.map(prepareWork);
};

const getWork = async (guid) => {
  // return prepareWork(worksResponse.value[0]);

  const response = await oDataApi.get(`/Document_асЗаказНаряд(guid'${guid}')`);
  return prepareWork(response.data);
};

const cars = async (guids) => {
  // return carsResponse.value.map(prepareCar);

  const filters = guids.map((guid) => `Ref_Key eq guid'${guid}'`).join(" or ");
  const response = await oDataApi.get("/Catalog_асАвтомобили", { params: { $filter: filters } });
  return response.data.value.map(prepareCar);
};

const customers = async (guids) => {
  const filters = guids.map((guid) => `Ref_Key eq guid'${guid}'`).join(" or ");
  const response = await oDataApi.get(`/Catalog_Контрагенты`, { params: { $filter: filters } });
  return response.data.value.map(prepareCustomer);
};

const parts = async (guids) => {
  // return partsResponse.value.map(preparePart);

  const filters = guids.map((guid) => `Ref_Key eq guid'${guid}'`).join(" or ");
  const response = await oDataApi.get(`/Catalog_Номенклатура`, { params: { $filter: filters } });
  return response.data.value.map(preparePart);
};

const API_URL = "http://192.168.1.124:3002/api";

const api = axios.create({ baseURL: API_URL });

const getPhotos = async (workGuid) => {
  const response = await api.get("/photos", { params: { workGuid } });
  return response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

const addPushToken = async (carGuid, token) => {
  const response = await api.post("/push-tokens", { token, carGuid });
  return response.data;
};

const getPushTokens = async (carGuid) => {
  const response = await api.get("/push-tokens", { params: { carGuid } });
  return response.data;
};

export default {
  appointment,
  carInfo,
  carGuid,
  carCustomers,
  workTypes,
  works,
  getWork,
  cars,
  customers,
  parts,
  getPhotos,
  addPushToken,
  getPushTokens,
};
