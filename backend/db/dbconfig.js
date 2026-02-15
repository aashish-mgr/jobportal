const {Sequelize} = require('sequelize');

//install sequelize and pg package before using this code

const DatabaseUrl = "postgresql://postgres.nmpfcilxsxiaphtiglfr:Ash0984888%23%40@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

const sequelize = new Sequelize(DatabaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  // enable SQL/query logging so ALTER statements and errors are visible
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});


const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
    require('../model/index'); // import all models so sequelize knows model definitions
    await sequelize.sync({ alter: true, force: false });
    console.log('Sequelize sync completed (alter: true)');
  } catch (err) {
    console.error('Database connection or sync error:', err);
    // Exit so the app doesn't continue in a bad state
    process.exit(1);
  }
}

module.exports = {sequelize,connectDb};