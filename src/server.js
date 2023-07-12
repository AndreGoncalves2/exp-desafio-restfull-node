require("express-async-errors");
require("dotenv/config");

const express = require("express");
const database = require("./database/sqlite");
const migrateRun = require("./database/sqlite/migrations");
const routes = require("./routes/index.js");
const AppError = require("./utils/appError");
const uploadConfig = require("./configs/upload");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

database();

app.use("/files", express.static(uploadConfig.UPLOADS_FODER));
app.use(routes);

migrateRun();

app.use((error, request, response, next) => {
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

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));