import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,  // Plain password (not hashed)
  role: DataTypes.STRING,
  division: DataTypes.STRING
}, {
  freezeTableName: true
});

export default User;

(async () => {
  await db.sync();  // Sync the model with the database
})();
