import { verify } from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ msg: "UnAuthorized: not authenticated!" });
    }

    const results = verify(token, process.env.WEB_TOKEN_SECRET) as JwtPayload;

    req.user = results.id;
    next();
  } catch (err) {
    return next(new Error("Authentication Error"));
  }
};
