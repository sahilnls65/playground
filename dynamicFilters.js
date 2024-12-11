const operatorMap = {
  _and: "$and",
  _or: "$or",
  _eq: "$eq",
  _neq: "$ne",
  _lt: "$lt",
  _lte: "$lte",
  _gt: "$gt",
  _gte: "$gte",
  _in: "$in",
  _nin: "$nin",
  _contains: "regex",
  _icontains: "regex",
  _starts_with: "regex",
  _istarts_with: "regex",
  _ends_with: "regex",
  _iends_with: "regex",
};

const constructQuery = (filter) => {
  if (!filter || typeof filter !== "object") return {};

  const query = {};

  for (const [key, value] of Object.entries(filter)) {
    const mongoOperator = operatorMap[key];

    if (mongoOperator === "$and" || mongoOperator === "$or") {
      // Logical operators (_and, _or)
      return { [mongoOperator]: value.map(constructQuery) };
    } else if (mongoOperator === "regex") {
      // Handle regex-based operators (_contains, _icontains, etc.)
      if (key === "_contains") {
        return { $regex: new RegExp(value, "") };
      } else if (key === "_icontains") {
        return { $regex: new RegExp(value, "i") };
      } else if (key === "_starts_with") {
        return { $regex: new RegExp(`^${value}`) };
      } else if (key === "_istarts_with") {
        return { $regex: new RegExp(`^${value}`, "i") };
      } else if (key === "_ends_with") {
        return { $regex: new RegExp(`${value}$`) };
      } else if (key === "_iends_with") {
        return { $regex: new RegExp(`${value}$`, "i") };
      }
    } else if (mongoOperator) {
      // Standard MongoDB operators (_eq, _gte, etc.)
      return { [mongoOperator]: value };
    } else if (typeof value === "object" && value !== null) {
      // Nested structures
      const nestedQuery = constructQuery(value);
      for (const [nestedKey, nestedValue] of Object.entries(nestedQuery)) {
        query[`${key}.${nestedKey}`] = nestedValue;
      }
    }
  }

  return query;
};

const filter = {
  _and: [
    {
      _or: [
        {
          Dropdown: {
            _eq: "1",
          },
        },
        {
          Autocomplete_input: {
            _contains: "sahil",
          },
        },
        {
          _and: [
            {
              Textarea: {
                _contains: "sa",
              },
            },
          ],
        },
      ],
    },
  ],
};

const mongoQuery = constructQuery(filter);
console.log(mongoQuery);
