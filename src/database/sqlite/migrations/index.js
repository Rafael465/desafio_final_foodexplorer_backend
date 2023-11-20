const sqliteConnection = require("../../sqlite");
const createEmpty = require("./createUsers");

async function migrationsRun(){
    const schemas = [
        createEmpty
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;
