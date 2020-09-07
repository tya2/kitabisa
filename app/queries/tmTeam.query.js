import TmTeam from '../models/tmTeam.model';

const attributes = ['team_id', 'name', 'is_active',
  'created_by', 'created_date', 'created_name', 'created_from'];

export function findByPk(primaryKey, params, trx) {
  return TmTeam.findByPk(primaryKey, { attributes, ...params, raw: true }, trx);
}

export function save(data, trx) {
  return TmTeam.create(data, trx);
}

export function findOne(params, trx) {
  return TmTeam.findOne({ attributes, ...params, raw: true }, trx);
}

export function find(params, trx) {
  return TmTeam.findAll({ attributes, ...params, raw: true }, trx);
}

export function count(params, trx) {
  return TmTeam.count({
    ...params,
    col: 'team_id',
    raw: true,
  }, trx);
}

export function remove(params, trx) {
  return TmTeam.destroy({
    ...params, returning: true, raw: true,
  }, trx);
}

export function update(data = {}, conditions = {}, trx) {
  return TmTeam.update(data, {
    attributes, ...conditions, returning: true, raw: true,
  }, trx);
}

export function findAndCountAll(params = {}, trx) {
  return TmTeam.findAndCountAll({
    attributes, ...params, returning: true, raw: true,
  }, trx);
}

/* ******************************* Custom Query ******************************* */
