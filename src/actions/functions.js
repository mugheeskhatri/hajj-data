export const encodedField = (field) => {
  return field * 184585 + 5598;
};

export const decodedField = (field) => {
  return (Number(field) - 5598) / 184585;
};

