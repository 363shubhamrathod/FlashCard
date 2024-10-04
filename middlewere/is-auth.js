const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	const token = req.get("Authorization");
	if (!token) {
		res.sendStatus(401);
	} else {
		try {
			const authToken = token.split(" ")[1];
			console.log(authToken);
			const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
			if (!decoded) {
				res.sendStatus(401);
			} else {
				req.tokenData = decoded;
				next();
			}
		} catch {
            res.sendStatus(500);
        }
	}
};
