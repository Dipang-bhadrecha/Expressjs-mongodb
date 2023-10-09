const jwt = require("jsonwebtoken");
const messages = require("../helper/message");

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: messages.TOKEN_NOT_VERIIFIED  });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: messages.INVALID_TOKEN });
    }

    // Attach the decoded token to the request object for later use
    req.user = decoded;
    console.log(req.user);
    next();
  });
}

module.exports = verifyToken;
