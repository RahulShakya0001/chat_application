import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).send("You are not authenticated.");
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid or expired token.");
      }

      req.userId = payload.userId;
      next();
    });
    
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).send("Internal server error.");
  }
};

