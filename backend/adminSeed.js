const {User} = require('./model');
const bcrypt = require('bcryptjs');

const seedAdminUser = async () => {
  const userAdmin = await User.findAll({where: {email: process.env.ADMIN_EMAIL}});

  if(userAdmin.length > 0) {
    console.log("Admin user already exists");
    return;
  }

  await User.create({
  name: "Admin User",
  email: process.env.ADMIN_EMAIL,
  password:  bcrypt.hashSync(process.env.ADMIN_PASSWORD,10),
  role: "jobprovider"
})
console.log("Admin user created successfully");
}

module.exports = seedAdminUser;