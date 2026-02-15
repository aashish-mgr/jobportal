const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered with this email" });
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10), //hashing password
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate jwt token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "20d",
    });

    res.status(200).json({ message: "Login Successful.", user, data: token });
  } catch (err) {
    console.log(err);
  }
};

const forgotPassword = async (req,res) => {
   const {email} = req.body;
  try {
    const isExistingUser = await User.findOne({ where: { email } });

    if (!isExistingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    isExistingUser.otp = otp;
    await isExistingUser.save();

    await sendEmail({
      email,
      subject: "Reset your password",
      message: `Your otp to reset your password is : ${otp}`,
    });

    return res.status(200).json({ message: "Otp sent to email" });
  } catch (err) {
    console.log("failed to process the otp", err);
    return res.status(500).json({ message: "Failed to send otp" });
  }
};

const verifyOtp = async (req,res) => {
  const {email,otp} = req.body;
  if(!email || !otp) {
     return res.status(400).json({
      message: "Please provide all the details"
     })
  }
  const userExists = await User.findOne({ where: { email } });
  if (!userExists) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userExists.otp !== otp) {
    return res.status(400).json({ message: "otp didn't match" });
  }

  userExists.otp = undefined;
  // model field is `isVerifed`
  userExists.isVerifed = true;
  await userExists.save();
  return res.status(200).json({ message: "Otp verified successfully" });

}

const resetPassword = async(req,res) => {
  const {email,newPassword,confirmPassword} = req.body;
 if(!email || !newPassword || !confirmPassword) {
  return res.status(400).json({
    message: "Please provide all the details"
  })
 }

 if(newPassword !== confirmPassword) {
  return res.status(400).json({
    message: "Password do not match"
  })
 }

  const userExists = await User.findOne({ where: { email } });
  if (!userExists) {
    return res.status(400).json({ message: "user not found" });
  }

  if (!userExists.isVerifed) {
    return res.status(400).json({ message: "You are not verified" });
  }

  userExists.password = bcrypt.hashSync(confirmPassword, 10);
  userExists.isVerifed = false;
  await userExists.save();

  return res.status(200).json({ message: "Password reset successfully" });



}

module.exports = { registerUser, loginUser,forgotPassword,verifyOtp,resetPassword };
