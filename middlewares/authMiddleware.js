const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // eslint-disable-next-line no-undef
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.body.id = decode.id;
        console.log(req.body.id);
        next();
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "Error in auth API: ",
    });
  }
};
