export const getHoursAndMinutesFromDecimal = (decimal?: number) => {
  if (!decimal) return '-';

  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  return `${hours.toLocaleString()}:${minutes.toString()}`;
};
