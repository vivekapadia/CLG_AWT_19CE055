constexpress = require("express");
constPORT = 80;
constapp = express();
consthandlebars = require("express-handlebars");
varmysql = require("mysql");

//connection
constconnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "Subject",
});
connection.connect((err) => {
	if (err) throwerr;
	console.log("ConnectedsuccessfullytoMySqlserver");
});

//createdatabase
constdbquery = "CREATEDATABASEIFNOTEXISTSSubject";
connection.query(dbquery, (err, result) => {
	if (err) throwerr;
	console.log("Databasecreatedsuccessfully", result);
});

//createtable
constdbtable = `CREATETABLEIFNOTEXISTSsubjectInfo(subjectCodevarchar(10)NOTNULL,subjectNamevarchar(50)NOTNULL,instituteNamevarchar(50)NOTNULL,departmentNamevarchar(50)NOTNULL,semestervarchar(1)NOTNULL,PRIMARYKEY(subjectCode))`;

//SHOWDATABASES=>ListtheavailableDBfromMySqlserver
connection.query("USESubject", (err, result) => {
	//"SelectDatabase"
	if (err) throwerr;
	connection.query(dbtable, (err, result) => {
		if (err) throwerr;
		console.log("Tablecreatedsuccessfully", result);
	});
});

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("viewengine", "hbs");
app.engine(
	"hbs",
	handlebars({
		layoutsDir: `${__dirname}/views/layouts`,
		extname: "hbs",
		defaultLayout: "index",
	})
);
app.get("/", (req, res) => {
	res.render("form");
});
app.post("/storeInfo", (req, res) => {
	//res.redirect("/show-data");
	varsubjectCode = req.body.scode;
	varsubjectName = req.body.sname;
	varinstituteName = req.body.iname;
	vardepartmentName = req.body.dname;
	varsemester = req.body.sem;
	varsql = `INSERTINTOsubjectInfo(subjectCode,subjectName,instituteName,departmentName,semester)VALUES("${subjectCode}","${subjectName}","${instituteName}","${departmentName}","${semester}")`;
	connection.query(sql, function (err, result) {
		if (err) throwerr;
		console.log("recordinserted");
		res.render("table", { data: req.body });
	});
});
app.listen(PORT, () => {
	console.log(`Serverislisteningonport${PORT}`);
});
