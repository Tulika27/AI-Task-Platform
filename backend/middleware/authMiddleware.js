const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Header se token lo
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // 2. "Bearer TOKEN" se TOKEN extract karo
    const token = authHeader.split(" ")[1];

    // 3. Verify token using .env secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 4. User info request me attach karo
    req.user = verified;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;