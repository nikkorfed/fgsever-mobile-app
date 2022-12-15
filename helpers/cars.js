export const prepareCar = (item) => ({
  guid: item.Ref_Key,
  vin: item.VIN,
  name: item.Description,
});
