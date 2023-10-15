import mysql from "mysql2";

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"slot-book"
})

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"slot-book"
// })

export {pool};