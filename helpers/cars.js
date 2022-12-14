export const prepareCar = (item) => ({
  vin: item.VIN,
  guid: item.Ref_Key,
  name: item.Description,
});
