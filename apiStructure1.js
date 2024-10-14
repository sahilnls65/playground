const api = {
  apiEndpoint: "/customApi",
  apiMethod: "POST",
  steps: [
    {
      type: "fetchData",
      collection: "users",
      query: {
        status: "active",
      },
      variableName: "activeUsers",
    },
    {
      type: "aggregateData",
      collection: "users",
      pipeline: [{ $match: { status: "active" } }, { $group: { _id: "$age", total: { $sum: 1 } } }],
      variableName: "aggregatedData",
    },
    {
      type: "createVariable",
      name: "filteredUsers",
      initialValue: [],
    },
    {
      type: "createVariable",
      name: "filteredUnder18Users",
      initialValue: [],
    },
    {
      type: "loop",
      collection: "activeUsers",
      variable: "user",
      body: [
        {
          type: "condition",
          condition: {
            left: "user.age",
            operator: "greaterThan",
            right: 18,
          },
          ifTrue: [
            {
              type: "appendToArray",
              arrayName: "filteredUsers",
              value: "user",
            },
          ],
          elseIf: [
            {
              condition: {
                left: "user.age",
                operator: "equals",
                right: 18,
              },
              body: [
                {
                  type: "appendToArray",
                  arrayName: "filteredUnder18Users",
                  value: "user",
                },
              ],
            },
          ],
          ifFalse: [
            {
              type: "appendToArray",
              arrayName: "filteredUnder18Users",
              value: "user",
            },
          ],
        },
      ],
    },
    {
      type: "returnVariables",
      variables: ["filteredUsers", "filteredUnder18Users", "aggregatedData"],
    },
  ],
};

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Middleware to connect to the database
const connectToDatabase = (req, res, next) => {
  req.db = mongoose.createConnection("mongodb://root:root@localhost:27017", { dbName: "test" });
  next();
};

app.use(connectToDatabase);

// Fetch API steps from the database
const fetchApiDefinition = async (apiEndpoint, db) => {
  return db.collection("apiDefinitions").findOne({ apiEndpoint });
};

// Evaluate condition based on the operator
const evaluateCondition = (condition, context) => {
  const leftValue = getValueFromContext(condition.left, context);
  const rightValue = condition.right;
  switch (condition.operator) {
    case "equals":
      return leftValue === rightValue;
    case "greaterThan":
      return leftValue > rightValue;
    case "lessThan":
      return leftValue < rightValue;
    // Add more operators as needed
  }
};

// Get value from the context object
const getValueFromContext = (path, context) => {
  return path.split(".").reduce((obj, key) => obj[key], context);
};

// Fetch data from the database
const fetchData = async (collection, query, db) => {
  return db.collection(collection).find(query).toArray();
};

// Perform aggregation on the database
const aggregateData = async (collection, pipeline, db) => {
  return db.collection(collection).aggregate(pipeline).toArray();
};

// Execute steps dynamically
const executeSteps = async (steps, context, db) => {
  for (const step of steps) {
    switch (step.type) {
      case "createVariable":
        context[step.name] = step.initialValue;
        break;
      case "assignVariable":
        context[step.variableName] = getValueFromContext(step.value, context);
        break;
      case "fetchData":
        context[step.variableName] = await fetchData(step.collection, step.query, db);
        break;
      case "aggregateData":
        context[step.variableName] = await aggregateData(step.collection, step.pipeline, db);
        break;
      case "loop":
        const collection = getValueFromContext(step.collection, context);
        for (const item of collection) {
          context[step.variable] = item;
          await executeSteps(step.body, context, db);
        }
        break;
      case "condition":
        if (evaluateCondition(step.condition, context)) {
          await executeSteps(step.ifTrue, context, db);
        } else {
          let elseIfExecuted = false;
          if (step.elseIf) {
            for (const elseIfStep of step.elseIf) {
              if (evaluateCondition(elseIfStep.condition, context)) {
                await executeSteps(elseIfStep.body, context, db);
                elseIfExecuted = true;
                break;
              }
            }
          }
          if (!elseIfExecuted) {
            await executeSteps(step.ifFalse, context, db);
          }
        }
        break;
      case "appendToArray":
        context[step.arrayName].push(getValueFromContext(step.value, context));
        break;
      case "mergeObjects":
        context[step.target] = {
          ...context[step.target],
          ...getValueFromContext(step.value, context),
        };
        break;
      case "returnVariables":
        return step.variables.reduce((result, variable) => {
          result[variable] = context[variable];
          return result;
        }, {});
    }
  }
};

const handleApiRequest = async (req, res) => {
  const apiEndpoint = req.path;
  const db = req.db;

  try {
    const apiDefinition = await fetchApiDefinition(apiEndpoint, db);

    if (!apiDefinition) {
      return res.status(404).send("API definition not found");
    }

    const context = {};
    const result = await executeSteps(apiDefinition.steps, context, db);

    res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  } finally {
    db.close();
  }
};

app.all("*", handleApiRequest);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
