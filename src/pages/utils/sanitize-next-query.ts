export const sanitizeNextQuery = (queryParams: {
  [key: string]: string | string[] | undefined;
}) => {
  return Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => [
      key,
      value ? flattenString(value) : "",
    ])
  );
};

export const flattenString = (str: string | string[]) =>
  Array.isArray(str) ? str.join(",").trim() : str.trim();
