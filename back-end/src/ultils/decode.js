export const decoded = (req, res, next) => {
    const authHeader = req.header(CONSTANT.header.refreshToken);
    if (authHeader) {
      return jwt.verify(
        authHeader,
        CONSTANT.jwt.secret,
        (err, decoded) => {
          if (err) return res.sendStatus(401); //invalid token
          req.id = decoded.id // value = decoded;
          next();
        }
      );
    }
  };