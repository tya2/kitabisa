import chai from 'chai';
import chaiHttp from 'chai-http';
import { isEmpty, result } from 'lodash';
import Sequelize from 'sequelize';
import app from '../app';
import * as api from './utils/api.util.test';
import { checkCommonResponse } from './utils/helpers/common.helper';
import { checkProblemOneResponse, checkProblemTwoResponse } from './utils/helpers/problem.helper';
import { findOne as findOneTeam, save as saveTeam } from '../queries/tmTeam.query';
import { generateCreatedAttribute } from '../utils/helpers.util';
import { addTeamFormat } from '../utils/payload.util';

chai.should();
chai.use(chaiHttp);

const { Op } = Sequelize;

describe('Index', () => {
  let token;

  before(async () => {

  });

  it('/api/v2 should have status 404 (Not Found)', (done) => {
    chai.request(app)
      .get('/api/v2')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });

  describe('Problem 1', () => {
    it('It should return true value', async () => {
      const payload = {
        question: '343 + 36435 - 34245 + 5867',
      };
      const res = await api.solveProblemOne(token, payload);
      checkCommonResponse(res);
      checkProblemOneResponse(res, payload);
      res.body.should.have.property('message').eql('Solve problem one successfully');
    });
  });

  describe('Problem 2', () => {
    const additionalPayload = {
      userId: 'Unit Testing',
      userName: 'Unit Testing',
      source: 'Unit Testing',
    };

    let playerId = '';

    it('It should return added player', async () => {
      let team = await findOneTeam({
        where: {
          [Op.and]: [
            { is_active: true },
          ],
        },
        order: [
          ['created_date', 'DESC'],
        ],
      });
      if (isEmpty(team)) {
        team = await saveTeam({
          ...addTeamFormat({
            name: 'Team 1',
          }),
          ...generateCreatedAttribute(additionalPayload, { headers: {}, connection: {} }),
        });
        team = team.get();
      }
      const payload = {
        name: 'Name 1',
        teamId: team.team_id,
        ...additionalPayload,
      };
      const res = await api.solveProblemTwoAdd(token, payload);
      playerId = result(res, 'body.data.player_id', '');
      checkCommonResponse(res);
      checkProblemTwoResponse(res, { ...payload, created: true });
      res.body.should.have.property('message').eql('Solve problem two (add) successfully');
    });

    it('It should return get player', async () => {
      const res = await api.solveProblemTwoGet(token);
      checkCommonResponse(res);
      checkProblemTwoResponse(res);
      res.body.should.have.property('message').eql('Solve problem two (get) successfully');
    });

    it('It should return update player', async () => {
      const payload = {
        name: 'Name 2',
        ...additionalPayload,
      };
      const res = await api.solveProblemTwoUpdate(token, payload, `/${playerId}`);
      checkCommonResponse(res);
      checkProblemTwoResponse(res, payload);
      res.body.should.have.property('message').eql('Solve problem two (update) successfully');
    });

    it('It should return delete player', async () => {
      const res = await api.solveProblemTwoDelete(token, additionalPayload, `/${playerId}`);
      checkCommonResponse(res);
      checkProblemTwoResponse(res, { ...additionalPayload, deleted: true });
      res.body.should.have.property('message').eql('Solve problem two (delete) successfully');
    });
  });
});
