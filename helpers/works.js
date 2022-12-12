import moment from "moment";

export const groupWorksByDate = (items) => {
  const result = [];

  items.map((work) => {
    const latestGroup = result[result.length - 1];
    const latestItem = latestGroup && latestGroup[latestGroup.length - 1];

    if (!latestGroup || !moment(latestItem.date).isSame(work.date, "day")) result.push([work]);
    else latestGroup.push(work);
  });

  return result;
};

export const formatDate = (date) => {
  const value = moment(date);

  if (value.isSame(moment(), "day")) return "Сегодня";
  else if (value.isSame(moment().subtract(1, "day"), "day")) return "Вчера";
  else if (value.isSame(moment(), "year")) return moment(date).format("D MMMM");
  else return moment(date).format("D MMMM YYYY");
};
