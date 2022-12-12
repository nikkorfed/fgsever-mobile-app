import axios from "axios";
import { encode } from "js-base64";

const api = axios.create({
  baseURL: "http://213.109.27.99:27/AutoserviceFgsever/odata/standard.odata/",
  headers: { Authorization: `Basic ${encode("КурочкинМ:789")}` },
  params: { $format: "json" },
});

const workTypes = () => api.get("/Catalog_асВидыРемонта");

const workByCar = (carGuid) => {
  const getFilterForGuid = (guid) => `Автомобиль_Key eq guid'${guid}'`;
  return api.get(`/Document_асЗаказНаряд`, {
    params: {
      $filter: Array.isArray(carGuid) ? carGuid.map(getFilterForGuid).join(" or ") : getFilterForGuid(carGuid),
      $orderby: "Date desc",
    },
  });
};

export default { workTypes, workByCar };
