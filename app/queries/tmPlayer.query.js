import TmPlayer from '../models/tmPlayer.model';
import TmTeam from '../models/tmTeam.model';

const attributes = ['player_id', 'name', 'team_id', 'is_active',
  'created_by', 'created_date', 'created_name', 'created_from',
  'modified_by', 'modified_date', 'modified_name', 'modified_from'];

export function findByPk(primaryKey, params, trx) {
  return TmPlayer.findByPk(primaryKey, { attributes, ...params, raw: true }, trx);
}

export function save(data, trx) {
  return TmPlayer.create(data, trx);
}

export function findOne(params, trx) {
  return TmPlayer.findOne({ attributes, ...params, raw: true }, trx);
}

export function find(params, trx) {
  return TmPlayer.findAll({ attributes, ...params, raw: true }, trx);
}

export function count(params, trx) {
  return TmPlayer.count({
    ...params,
    col: 'player_id',
    raw: true,
  }, trx);
}

export function remove(params, trx) {
  return TmPlayer.destroy({
    ...params, returning: true, raw: true,
  }, trx);
}

export function update(data = {}, conditions = {}, trx) {
  return TmPlayer.update(data, {
    attributes, ...conditions, returning: true, raw: true,
  }, trx);
}

export function findAndCountAll(params = {}, trx) {
  return TmPlayer.findAndCountAll({
    attributes, ...params, returning: true, raw: true,
  }, trx);
}

/* ******************************* Custom Query ******************************* */

export function findPlayerTeam(params = {}) {
  TmTeam.hasMany(TmPlayer, { foreignKey: 'team_id' });
  TmPlayer.belongsTo(TmTeam, { foreignKey: 'team_id' });

  return find({
    ...params,
    include: [{
      model: TmTeam,
      attributes: [],
      required: false,
      duplicating: false,
      nested: false,
    }],
  });
}
