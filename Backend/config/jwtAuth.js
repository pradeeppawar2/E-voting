const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    // Verify token
    const decoded = jwt.verify(token, "secretkey");
    console.log("decoded" +  JSON.stringify(decoded));
    // Add user from payload to request
    req.user = decoded;
    next();
  } catch (err) {
    // Return error response if token is not valid
    console.log('jwt:' + err)
    return res.status(400).send({ auth: false, message: "Invalid Token" });
  }
};


const generateToken = (userData) => {
  return jwt.sign(userData, "secretkey",{ expiresIn: '1h'});
};
module.exports = { jwtAuthMiddleware, generateToken };
