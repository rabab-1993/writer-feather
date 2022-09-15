import { config } from "dotenv";
config();

import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
const secretKey = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const parseToken = verify(token, secretKey);
    req.saveToken = parseToken;
    next();
  } catch (error) {
    res.status(403).json;
  }
};

export default authentication;
