const express = require("express");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;

const app = express();
app.use(express.json());

// Middleware to connect to the database
const connectToDatabase = async (req, res, next) => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect("mongodb://127.0.0.1:27017", {dbName: "test"});
            console.log("Connected to the database");
        }
        req.db = mongoose.connection;
        next();
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).send("Internal Server Error");
    }
};

app.use(connectToDatabase);

function generateRegexList(route) {
    const parts = route.split('/').filter(Boolean); // Filter removes empty parts
    const regexList = [];

    const staticRegex = '^/' + parts.join('/') + '$';
    regexList.push(staticRegex);

    const numParts = parts.length;

    for (let i = 0; i < numParts; i++) {
        const modifiedParts = [...parts];

        modifiedParts[i] = ':\\w+';

        const dynamicRegex = '^/' + modifiedParts.join('/') + '$';
        regexList.push(dynamicRegex);
    }

    for (let j = 1; j <= numParts; j++) {
        const combinations = getCombinations(parts, j);
        for (const combination of combinations) {
            const modifiedParts = [...parts];

            for (const index of combination) {
                modifiedParts[index] = ':\\w+';
            }

            const additionalDynamicRegex = '^/' + modifiedParts.join('/') + '$';
            regexList.push(additionalDynamicRegex);
        }
    }

    const uniqueRegexList = [...new Set(regexList)];

    return uniqueRegexList;
}

function getCombinations(arr, length) {
    const result = [];
    const combination = [];

    function backtrack(start) {
        if (combination.length === length) {
            result.push([...combination]);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            combination.push(i);
            backtrack(i + 1);
            combination.pop();
        }
    }

    backtrack(0);
    return result;
}

const handleApiRequest = async (req, res) => {
    console.log("Handling API request");
    const splittedPath = req.path.split("/")?.filter((i) => i !== "");
    console.log(splittedPath);
    if (splittedPath[0] === "content") {
        console.log("/" + splittedPath.slice(1).join("/"));

        const regexList = generateRegexList("/" + splittedPath.slice(1).join("/"))


        let response = await req.db.collection("test_collection").aggregate([
            {
                $match: {
                    $or: regexList.map((regexObj, index) => ({
                        path: {
                            $regex: regexObj,
                            $options: "i"
                        },
                    }))
                }
            }
        ]).toArray();


        res.status(200).send({
            response, query: [
                {
                    $match: {
                        $or: regexList.map((regexObj, index) => ({
                            path: {
                                $regex: regexObj,
                                $options: "i"
                            },
                        }))
                    }
                }
            ]
        });
    } else {
        res.status(404).send("Not Found");
    }
};

app.all("*", handleApiRequest);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// default get route on users
const apiData = {
    path: "/users",
    method: "GET",
    schemaId: new ObjectId(),
    schemaName: "users",
}

const getApiDataById = {
    path: "/users/:id",
    method: "GET",
    schemaId: new ObjectId(),
    schemaName: "users",
}