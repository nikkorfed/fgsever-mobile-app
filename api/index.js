import axios from "axios";
import { encode } from "js-base64";

import { prepareCar } from "../helpers/cars";
import { prepareWorkType, prepareWork } from "../helpers/works";
import { carsResponse, worksResponse, workTypesResponse } from "../mocks";

const serializer = (params) => {
  const entries = Object.entries(params);
  return entries.map(([key, value]) => `${key}=${value}`).join("&");
};

const api = axios.create({
  baseURL: "http://213.109.27.99:27/AutoserviceFgsever/odata/standard.odata/",
  headers: { Authorization: `Basic ${encode("КурочкинМ:789")}` },
  params: { $format: "json" },
  paramsSerializer: { serialize: serializer },
});

const carInfo = async (vin) => {
  const response = await axios.post("https://fgsever.ru/scripts/php/calculators/car-info.php", null, { params: { vin } }).catch((error) => {
    console.log("ERROR RESPONSE", error.response);
  });
  return response.data;
};

const carGuid = async (vin) => {
  // return carsResponse.value.map(prepareCar)[0];
  const response = await api.get("/Catalog_асАвтомобили", { params: { $filter: `like(VIN,'%${vin}')` } }).catch((error) => {
    console.log("ERROR RESPONSE", error.response);
  });
  return response.data.value.map(prepareCar)[0];
};

const workTypes = async () => {
  // return workTypesResponse.value.map(prepareWorkType);
  const response = await api.get("/Catalog_асВидыРемонта");
  return response.data.value.map(prepareWorkType);
};

const works = async ({ carGuids, workTypeGuids = [] }) => {
  // return worksResponse.value.map(prepareWork);

  const carsFilter = carGuids.map((guid) => `Автомобиль_Key eq guid'${guid}'`).join(" or ");
  const workTypeFilter = workTypeGuids.map((guid) => `ВидРемонта_Key eq guid'${guid}'`).join(" or ");

  let filters = [carsFilter, workTypeFilter].filter((i) => i);
  filters.length > 1 && (filters = filters.map((filter) => `(${filter})`).join(" and "));

  const response = await api.get(`/Document_асЗаказНаряд`, { params: { $filter: filters, $orderby: "Date desc" } });
  return response.data.value.map(prepareWork);
};

export default { carInfo, carGuid, workTypes, works };
