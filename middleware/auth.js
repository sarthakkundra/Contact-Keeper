const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

const secret = config.jwtSecret;

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
