import axios from "axios";
import { encode } from "js-base64";

import { prepareWorkType, prepareWork } from "../helpers/works";

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

const workTypes = async () => {
  const response = await api.get("/Catalog_асВидыРемонта");
  return response.data.value.map(prepareWorkType);
};

const worksByCar = async (carGuid) => {
  const getFilterForGuid = (guid) => `Автомобиль_Key eq guid'${guid}'`;
  const response = await api.get(`/Document_асЗаказНаряд`, {
    params: {
      $filter: Array.isArray(carGuid) ? carGuid.map(getFilterForGuid).join(" or ") : getFilterForGuid(carGuid),
      $orderby: "Date desc",
    },
  });
  return response.data.value.map(prepareWork);
};

export default { workTypes, worksByCar };
