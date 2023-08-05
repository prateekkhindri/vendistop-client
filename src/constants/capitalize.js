export const capitalize = function (string) {
  return string
    .split(/_| /)
    .map((part) => part[0]?.toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};
