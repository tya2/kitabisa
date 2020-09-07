import Sequelize from 'sequelize';
import { isEmpty, omit } from 'lodash';
import { calculateX } from '../functions/problemOne.function';
import {
  findPlayerTeam, findOne as findOnePlayer, save as savePlayer, update as updatePlayer,
} from '../queries/tmPlayer.query';
import { findOne as findOneTeam } from '../queries/tmTeam.query';
import { generateCreatedAttribute, generateModifiedAttribute } from '../utils/helpers.util';
import { addPlayerFormat, updateFormat } from '../utils/payload.util';

const { Op } = Sequelize;

export function problemOne(req, res) {
  try {
    const { question = '' } = req.body;
    const response = calculateX(question);
    res.status(200).json({
      data: response,
      status: 'OK',
      message: 'Solve problem one successfully',
    });
    req.message = 'Solve problem one successfully';
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoGet(req, res) {
  try {
    const response = await findPlayerTeam({
      where: {
        [Op.and]: [
          { is_active: true },
        ],
      },
      order: [
        ['created_date', 'DESC'],
      ],
    });
    res.status(200).json({
      data: response,
      status: 'OK',
      message: 'Solve problem two (get) successfully',
    });
    req.message = 'Solve problem two (get) successfully';
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoAdd(req, res) {
  try {
    const { name, teamId } = req.body;
    const team = await findOneTeam({
      where: {
        [Op.and]: [
          { team_id: teamId },
          { is_active: true },
        ],
      },
    });
    if (isEmpty(team)) throw new Error('Team not found');
    const player = await findOnePlayer({
      where: {
        [Op.and]: [
          { name },
          { team_id: teamId },
          { is_active: true },
        ],
      },
    });
    if (!isEmpty(player)) throw new Error('Player already exist');
    const response = await savePlayer({
      ...addPlayerFormat(req.body),
      ...generateCreatedAttribute(req.body, req),
      ...generateModifiedAttribute(req.body, req),
    });
    res.status(200).json({
      data: response,
      status: 'OK',
      message: 'Solve problem two (add) successfully',
    });
    req.message = 'Solve problem two (add) successfully';
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoUpdate(req, res) {
  try {
    const { playerId } = req.params;
    const { name, teamId } = req.body;
    if (!isEmpty(teamId)) {
      const team = await findOneTeam({
        where: {
          [Op.and]: [
            { team_id: teamId },
            { is_active: true },
          ],
        },
      });
      if (isEmpty(team)) throw new Error('Team not found');
    }
    if (!isEmpty(name) && !isEmpty(teamId)) {
      const player = await findOnePlayer({
        where: {
          [Op.and]: [
            { name },
            { team_id: teamId },
            { is_active: true },
          ],
        },
      });
      if (!isEmpty(player)) throw new Error('Player already exist');
    }
    if (!isEmpty(name)) {
      const player = await findOnePlayer({
        where: {
          [Op.and]: [
            { player_id: { [Op.not]: playerId } },
            { name },
            { is_active: true },
          ],
        },
      });
      if (!isEmpty(player)) throw new Error('Player already exist');
    }
    const response = await updatePlayer({
      ...updateFormat(omit(req.body, ['userId', 'userName', 'source'])),
      ...generateModifiedAttribute(req.body, req),
    }, { where: { player_id: playerId } });
    res.status(200).json({
      data: response[1][0],
      status: 'OK',
      message: 'Solve problem two (update) successfully',
    });
    req.message = 'Solve problem two (update) successfully';
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoDelete(req, res) {
  try {
    const { playerId } = req.params;
    const player = await findOnePlayer({
      where: {
        [Op.and]: [
          { player_id: playerId },
          { is_active: true },
        ],
      },
    });
    if (isEmpty(player)) throw new Error('Player not found');
    const response = await updatePlayer({
      is_active: false,
      ...generateModifiedAttribute(req.body, req),
    }, { where: { player_id: playerId } });
    res.status(200).json({
      data: response[1][0],
      status: 'OK',
      message: 'Solve problem two (delete) successfully',
    });
    req.message = 'Solve problem two (delete) successfully';
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}
