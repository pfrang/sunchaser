import { flexbox, border, color, layout, position, space } from "styled-system";

export const JSToCSS = (JS) => {
  const cleanedForStyledSystem = cleanForStyledSystem(JS);

  const dollarSignNestedKeys = addDollarSignToKeysNested(
    cleanedForStyledSystem,
  );

  return dollarSignNestedKeys;
};

function addDollarSignToKeysNested(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      obj[`$${key}`] = { ...obj[key] };
      delete obj[key];
      addDollarSignToKeysNested(obj[`$${key}`]);
    } else {
      obj[`$${key}`] = obj[key];
      delete obj[key];
    }

    // if (key.startsWith('@media')) {
    //   delete obj[key];
    // }
  });
  return obj;
}

export const cleanForStyledSystem = (JS) => {
  const mergeObjects = (...objects) => {
    return objects.reduce((acc, obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (
          acc[key] &&
          typeof acc[key] === "object" &&
          typeof value === "object"
        ) {
          acc[key] = mergeObjects(acc[key], value);
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {});
  };

  const cleanedForStyledSystem = mergeObjects(
    flexbox(JS),
    border(JS),
    color(JS),
    layout(JS),
    position(JS),
    space(JS),
  );

  const transformedtoPxValuesNested = transformtoPxValuesRecursed(
    cleanedForStyledSystem,
  );

  return transformedtoPxValuesNested;
};

export const applyMediaQueries = (props: Record<string, any>) => {
  const mediaQueries = Object.keys(props).filter((key) =>
    key.startsWith("$@media"),
  );
  const mediaQueriesStyles = mediaQueries.reduce((acc, key) => {
    acc[key] = {
      ...acc[key],
      ...props[key],
    };
    return acc;
  }, {});

  const baseStyles = Object.keys(props).reduce((acc, key) => {
    if (!key.startsWith("$@media")) {
      acc[key] = props[key];
    }
    return acc;
  }, {});

  return {
    baseStyles,
    mediaQueriesStyles,
  };
};

const transformtoPxValuesRecursed = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      transformtoPxValuesRecursed(obj[key]);
    } else {
      if (Number(obj[key] || obj[key] === "0" || obj[key] === 0)) {
        obj[key] = `${obj[key]}px`;
      }
    }
  });
  return obj;
};
