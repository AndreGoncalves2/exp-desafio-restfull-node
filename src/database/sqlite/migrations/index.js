const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrateRun() {
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
};

module.exports = migrateRun;