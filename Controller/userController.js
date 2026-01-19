const User = require('../model/UserModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this email' });
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10), //hashing password
      role
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req,res) => {
const { email, password } = req.body;       

try {

if(!email || !password){
    return res.status(400).json({ message: 'Email and password are required' });
}

const user = await User.findOne({ where: { email } });

if(!user){
  return res.status(400).json({"message": "Invalid email or password"});
}

const isPasswordValid =  bcrypt.compareSync(password,user.password);

if(!isPasswordValid){
  return res.status(400).json({"message": "Invalid email or password"});
}

//generate jwt token
const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
  expiresIn: "20d"
})

res.status(200).json({"message": "Login Successful.",user,
  data: token
})
}
catch (err) {
  console.log(err)
}
}

module.exports = {registerUser,loginUser};
