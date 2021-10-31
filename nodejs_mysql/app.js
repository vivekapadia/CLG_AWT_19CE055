//Create DB connection | Database | Table | Insert Record | Display
// npm i

const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 80;

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	// remove the comment of below property after you have run db-create 
	database: "University",
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected successfully to MySql server");
});

//db-create => create Database
app.get("/db-create", (req, res) => {
	const dbquery = "CREATE DATABASE IF NOT EXISTS University";

	connection.query(dbquery, (err, result) => {
		if (err) throw err;
		console.log("Database created successfully", result);
	});
});

//db-table => Create Table in University DB
app.get("/db-table", (req, res) => {
	const dbtable = `CREATE TABLE IF NOT EXISTS studentInfo(
        studentID varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        mobileNo varchar(15) NOT NULL,
        PRIMARY KEY (studentID))`;

	// SHOW DATABASES => List the available DB from MySql server
	// connection.query("USE University",(err,result)=>{ // "Select Database"
	//     if(err) throw err;
	connection.query(dbtable, (err, result) => {
		if (err) throw err;
		console.log("Table created successfully", result);
	});
	// });
});

//db-insert => Insert Record into studentInfo Table
app.get("/db-insert", (req, res) => {
	const dbInsert = `INSERT INTO studentInfo
    (studentID,fname,lname,mobileNo)
    VALUES ('101','Margiv','Amin','123456789'),
    ('102','Saheel','Sapovadia','123456789'),
    ('103','Vivek','Kapadia','123456789')`;

	connection.query(dbInsert, (err, result) => {
		if (err) throw err;
		console.log(`Total affected ROWS: ${result["affectedRows"]}`);
	});
});

//Display Record => SELECT * from studentInfo
app.get("/db-display", (req, res) => {
	const dbdisplay = `SELECT * FROM studentInfo`;
	connection.query(dbdisplay, (err, rows) => {
		if (err) throw err;
		console.log("Data received");
		console.log(rows);
		console.log("------------------------------------");
		console.log(`\nData : \n\nstudentId firstname \tlastname \tmobileno \n`);
		for (let index = 0; index < rows.length; index++) {
			let id = rows[index].studentID;
			let fname = rows[index].fname;
			let lname = rows[index].lname;
			let mobileNo = rows[index].mobileNo;

			console.log(
				`${id.padStart(9)} ${fname.padEnd(13)} ${lname.padEnd(
					15
				)} ${mobileNo.padEnd(10)}\n`
			);
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on port number ${port}`);
});
