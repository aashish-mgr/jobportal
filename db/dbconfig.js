const {Sequelize} = require('sequelize');

//install sequelize and pg package before using this code

const DatabaseUrl = "postgresql://postgres.nmpfcilxsxiaphtiglfr:Ash0984888%23%40@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

const sequelize = new Sequelize(DatabaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
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
    console.log("Connection has been established sucessfully");
    require('../model/index'); //import all models to sync with db
    await sequelize.sync({alter:true,force:false});
  }

  catch (err) {
  console.log(err);
  }
}

module.exports = {sequelize,connectDb};