export const prepareCustomer = (item) => ({
  guid: item.Ref_Key,
  name: item.Description.trim(),
});
