const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const FlashCard = require("../models/FlashCard");
require("dotenv").config();

router.get("/admin", async (req, res, next) => {
	const token = req.get("Authorization");
	if (!token) {
		res.sendStatus(401);
	} else {
		const authToken = token.split(" ")[1];
		// console.log(authToken);
		const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
		// console.log(decoded);
		const { id } = await Admin.findOne({ where: { email: decoded.email } });
		const flashcards = await FlashCard.findAll({ where: { adminId: id } });
		// console.log(flashcards);
		res.json(flashcards);
		// res.sendStatus(401);
	}
});

router.get("/admin/create/:id", async (req, res, next) => {
	const { id } = req.params;
	const flashcards = await FlashCard.findByPk(id);
	// console.log(flashcards);
	res.json(flashcards);
});

router.put("/admin/create/:id", async (req, res, next) => {
	const { id } = req.params;
	const flashcards = await FlashCard.findByPk(id);
	// console.log(flashcards);
	console.log(req.body);
	flashcards.qustion = req.body.qustion;
	flashcards.answer = req.body.answer;
	await flashcards.save();
	res.sendStatus(201);
});

router.post("/admin/create", async (req, res, next) => {
	const token = req.get("Authorization");
	if (!token) {
		res.sendStatus(401);
	} else {
		const authToken = token.split(" ")[1];
		// console.log(authToken);
		const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
		// console.log(decoded);
		const user = await Admin.findOne({ where: { email: decoded.email } });
		if (user) {
			const newFlashcard = await user.createFlashCard({
				qustion: req.body.qustion,
				answer: req.body.answer,
			});

			res.status(201).json(newFlashcard);
		} else {
			res.sendStatus(401);
		}
	}
});

router.delete("/admin/delete/:id", async (req, res, next) => {
	const { id } = req.params;
	await FlashCard.destroy({
		where: {
			id: id,
		},
	});
	res.sendStatus(204);
});
module.exports = router;
