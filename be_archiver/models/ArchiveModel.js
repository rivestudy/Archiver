import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Archive = db.define('Archives', {
  userid: DataTypes.BIGINT,
  kodeklasifikasi: DataTypes.STRING,
  accepted: DataTypes.BOOLEAN,
  divisionUser: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  detail: DataTypes.STRING,
  jumlah: DataTypes.BIGINT,
  kurun: DataTypes.BIGINT,
  tipe: DataTypes.STRING,
  retensiaktif: DataTypes.BIGINT,
  retensiinaktif: DataTypes.BIGINT,
  asli: DataTypes.BOOLEAN,
  tekstual: DataTypes.BOOLEAN,
  kondisibaik: DataTypes.BOOLEAN,
  others: DataTypes.STRING
}, {
  freezeTableName: true
});

export default Archive;

(async () => {
  await db.sync();
})();
