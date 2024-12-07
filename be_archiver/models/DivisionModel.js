import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Division = db.define('divisions', {
  name: DataTypes.STRING,
});

export default Division;

(async () => {
  await db.sync();
})();
