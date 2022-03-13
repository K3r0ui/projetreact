import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).send("Access denied.");
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY_C);
    req.user = decoded;
    next();
  } catch (error) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRETKEY_J);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  }
};
