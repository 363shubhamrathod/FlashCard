const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("../models/Admin");
const FlashCard = require("../models/FlashCard");

const isAuth = require("../middlewere/is-auth");

router.post("/login", async (req, res, next) => {
	const query = { email: req.body.email };
	// console.log(req.body.email);
	try {
		const user = await Admin.findOne({ where: query });
		if (user) {
			const isMatch = bcrypt.compareSync(req.body.password, user.password);
			// console.log(isMatch);
			if (isMatch) {
				const token = await jwt.sign(
					{ email: user.email },
					process.env.JWT_SECRET
				);
				res.status(201).json({ token });
			} else {
				res.sendStatus(401);
			}
		} else {
			res.sendStatus(401);
		}
	} catch {
		res.sendStatus(500);
	}
});

router.post("/signup", (req, res, next) => {
	const data = {
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		name: req.body.name,
	};
	try {
		Admin.create(data)
			.then(() => {
				res.sendStatus(201);
			})
			.catch(() => {
				res.sendStatus(401);
			});
	} catch {
		res.sendStatus(401);
	}
});

router.get("/dashboard/flashcard/:id", isAuth, async (req, res, next) => {
	try {
		const { id } = req.params;
        const user = await Admin.findOne({where:{email:req.tokenData.email}});
		const flashcards = await FlashCard.findOne({where:{id:id,adminId:user.id}});
		// console.log(flashcards);
		res.json(flashcards);
	} catch {
		res.sendStatus(404);
	}
});

router.put("/dashboard/flashcard/:id",isAuth, async (req, res, next) => {
	try {
		const { id } = req.params;
        const user = await Admin.findOne({where:{email:req.tokenData.email}});
		const flashcards = await FlashCard.findOne({where:{id:id,adminId:user.id}});
		flashcards.qustion = req.body.qustion;
		flashcards.answer = req.body.answer;
		await flashcards.save();
		res.sendStatus(202);
	} catch {
		res.sendStatus(404);
	}
});

router.delete("/dashboard/flashcard/:id", isAuth, async (req, res, next) => {
	try {
		const { id } = req.params;
        const user = await Admin.findOne({where:{email:req.tokenData.email}});
		const flashcards = await FlashCard.findOne({where:{id:id,adminId:user.id}});
		await flashcards.destroy();
		res.sendStatus(204);
	} catch {
		res.sendStatus(404);
	}
});

router.get("/dashboard/flashcard", isAuth, async (req, res, next) => {
	try {
		const query = { email: req.tokenData.email };

		const user = await Admin.findOne({ where: query });
		const flashcards = await user.getFlashCards();

		res.json(flashcards);
	} catch {
		res.sendStatus(401);
	}
});



router.post("/dashboard/flashcard", isAuth, async (req, res, next) => {
	try {
		const query = { email: req.tokenData.email };
		const user = await Admin.findOne({ where: query });
		if (user) {
			const newFlashcard = await user.createFlashCard({
				qustion: req.body.qustion,
				answer: req.body.answer,
			});
			res.status(201).json(newFlashcard);
		} else {
			res.sendStatus(401);
		}
	} catch {
		res.sendStatus(401);
	}
});

module.exports = router;
