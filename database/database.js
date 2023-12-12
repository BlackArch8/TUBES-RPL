import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tubes_rpl",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database tubes_rpl connected");
});

export {db, db as default}