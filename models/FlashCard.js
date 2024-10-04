const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const FlashCard = sequelize.define("flashCard", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
        primaryKey:true,
	},
	qustion: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	answer: { type: DataTypes.STRING, allowNull: false },
});

module.exports = FlashCard;
