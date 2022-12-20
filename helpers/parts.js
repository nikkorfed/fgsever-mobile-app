export const preparePart = (item) => ({
  guid: item.Ref_Key,
  name: item.Description.trim(),
});
