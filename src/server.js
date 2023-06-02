const express = require("express");
const database = require("./database/sqlite");
const migrateRun = require("./database/sqlite/migrations");

const app = express();
app.use(express.json());

database();

migrateRun();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));