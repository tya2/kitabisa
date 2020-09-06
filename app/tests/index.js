import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import * as api from './utils/api.util.test';
import { checkCommonResponse } from './utils/helpers/common.helper';
import { checkProblemOneResponse } from './utils/helpers/problem.helper';

chai.should();
chai.use(chaiHttp);

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
});
