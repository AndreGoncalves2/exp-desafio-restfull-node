require("express-async-errors");
const express = require("express");
const database = require("./database/sqlite");
const migrateRun = require("./database/sqlite/migrations");
const routes = require("./routes/index.js");
const AppError = require("./utils/appError");

const app = express();
app.use(express.json());

database();

app.use(routes);

migrateRun();

app.use((error, request, response, next) => {
    console.log(error);
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    };

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));