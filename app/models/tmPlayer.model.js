import Sequelize from 'sequelize';
import uuidv4 from 'uuid/v4';
import { db1 } from '.';
import { table } from '../variables/tableName.variable';

module.exports = db1.define(table.TM_PLAYER, {
  player_id: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  team_id: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: true,
  },
  created_by: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  created_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  created_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  created_from: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  modified_by: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  modified_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  modified_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  modified_from: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  classMethods: {},
  freezeTableName: true,
  tableName: table.TM_PLAYER,
  timestamps: false,
});
