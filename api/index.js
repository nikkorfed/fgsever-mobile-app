import axios from "axios";
import Constants from "expo-constants";
import { encode } from "js-base64";
import { uniqBy } from "lodash";

import { prepareCar } from "../helpers/cars";
import { prepareCustomer } from "../helpers/customer";
import { preparePart } from "../helpers/parts";
import { prepareWorkType, prepareWork } from "../helpers/works";
// import { carsResponse, worksResponse, workTypesResponse, partsResponse } from "../mocks";

const { apiUrl, odataApiUrl } = Constants.expoConfig.extra;

const serializer = (params) => {
  const entries = Object.entries(params);
  return entries.map(([key, value]) => `${key}=${value}`).join("&");
};

const oDataApi = axios.create({
  baseURL: odataApiUrl,
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

const works = async ({ carGuids, workTypeGuids = [], limit = 10, offset = 0 }) => {
  // return worksResponse.value.map(prepareWork);

  const carsFilter = carGuids.map((guid) => `Автомобиль_Key eq guid'${guid}'`).join(" or ");
  const workTypeFilter = workTypeGuids.map((guid) => `ВидРемонта_Key eq guid'${guid}'`).join(" or ");

  let filters = [carsFilter, workTypeFilter].filter((i) => i);
  filters.length > 1 && (filters = filters.map((filter) => `(${filter})`));
  filters = filters.join(" and ");

  const response = await oDataApi.get(`/Document_асЗаказНаряд`, {
    params: { $top: limit, $skip: offset, $filter: filters, $orderby: "Date desc" },
  });
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

const api = axios.create({ baseURL: apiUrl });

const getWorkApprovals = async (guids) => {
  const response = await api.get(`/work-approvals`, { params: { guid: guids.join(",") } });
  return response.data;
};

const getWorkApproval = async (guid) => {
  const response = await api.get(`/work-approvals/${guid}`);
  return response.data;
};

const addWorkApproval = async (guid) => {
  const response = await api.post(`/work-approvals`, { guid });
  return response.data;
};

const removeWorkApproval = async (guid) => {
  const response = await api.delete(`/work-approvals/${guid}`);
  return response.data;
};

const getPhotos = async (workGuid) => {
  const response = await api.get("/photos", { params: { workGuid } });
  return response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

const addPushToken = async ({ token, type, refGuid }) => {
  const response = await api.post("/push-tokens", { token, type, refGuid });
  return response.data;
};

const getPushTokens = async ({ token, type, refGuid }) => {
  const response = await api.get("/push-tokens", { params: { token, type, refGuid } });
  return response.data;
};

const removePushToken = async ({ token, type, refGuid }) => {
  const [pushToken] = await getPushTokens({ token, type, refGuid });
  if (!pushToken) return;

  const response = await api.delete(`/push-tokens/${pushToken.guid}`);
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
  getWorkApprovals,
  getWorkApproval,
  addWorkApproval,
  removeWorkApproval,
  getPhotos,
  addPushToken,
  getPushTokens,
  removePushToken,
};
