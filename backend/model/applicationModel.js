const { DataTypes }= require('sequelize');
const {sequelize }= require('../db/dbconfig');


const Application = sequelize.define("Application", {
   id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
   },
   status: {
    type: DataTypes.ENUM( 'pending', 'rejected', 'approved'),
    defaultValue: 'pending',
    allowNull: false
   },
   appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
   },
    userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
   jobId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Jobs",
      key: "id",
    },
  },
});

module.exports = Application;

