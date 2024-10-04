const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Admin = sequelize.define("admin", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
        unique:true,
	},
});

module.exports = Admin;
