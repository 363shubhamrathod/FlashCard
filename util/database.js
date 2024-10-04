const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_DOMAIN,
		dialect: "mysql",
	}
);
// async function databaseTest() {
// 	try {
// 		// await sequelize.authenticate();
// 		await sequelize.sync({ force: true });
// 		// sequelize.sync();

// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// }
// databaseTest();
module.exports = sequelize;
