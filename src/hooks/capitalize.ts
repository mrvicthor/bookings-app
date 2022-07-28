export const capitalizeFirstLetter = (value: string) => {
  const result = value.charAt(0).toUpperCase() + value.slice(1);
  return result;
};
