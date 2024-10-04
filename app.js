const express = require("express");
const bodyParser = require("body-parser");

// eviroment variables................................................................//
require("dotenv").config();

//server app................................................................//
const app = express();

// body parser................................................................//
app.use(bodyParser.json());

// routes................................................................//
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});
const adminRouter = require("./routes/admin");
const flashCardRouter = require("./routes/flashcard");
//
app.use("/admin", adminRouter);
app.use("/flashcard", flashCardRouter);

// Databse realtionships................................................................//
const sequelize = require("./util/database");
const Admin = require("./models/Admin");
const FlashCard = require("./models/FlashCard");

Admin.hasMany(FlashCard, { onDelete: "CASCADE" });
FlashCard.belongsTo(Admin);

sequelize
	// .sync({ force: true })
	// .sync({ alter: true })
	.sync()
	.then(() => {
		app.listen(process.env.PORT || 3000);
		console.log("server started");
	})
	.catch((e) => {
		console.log(e);
	});
