const bcrypt = require("bcryptjs");
const userModel = require("../../Models/userModel");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    // console.log(username,email,Password,Phone,Address,answer)=req;
    const { userName, email, Password, Phone, Address, answer } = req.body;

    console.log(userName, email, Password, Phone, Address, answer);

    if (!userName || !email || !Password || !Phone || !Address || !answer)
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });

    //check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists with this email",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(Password, salt);
    const userCreated = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      Address,
      Phone,
      answer,
    });
    console.log(userCreated);
    res.status(201).send({
      success: true,
      message: "User registration successful",
      user: userCreated,
    });
  } catch (e) {
    console.log("Error occured ", e);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this email,Enter a valid email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    if (isMatch == true) {
      return res.status(200).send({
        success: true,
        message: "Login successful",
        token: token,
        user: user,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Incorrect password,Enter  a valid password",
      });
    }
  } catch (e) {
    console.log("Error occured ", e);
  }
};

module.exports = { registerController, loginController };
