import { isEmpty } from 'lodash';
import { getRandomInt } from '../../../utils/transformer.util';

export function checkProblemOneResponse(res, payload = {}) {
  const { question = '' } = payload;
  res.body.data.should.be.a('number');
  return question;
}

export function checkProblemTwoResponse(res, payload = {}) {
  const {
    name, teamId, userId, userName, source, created = false, deleted = false,
  } = payload;
  if (Array.isArray(res.body.data)) {
    const index = getRandomInt(res.body.data.length - 1);

    res.body.data[index].should.have.property('player_id');
    res.body.data[index].should.have.property('name');
    res.body.data[index].should.have.property('team_id');
    res.body.data[index].should.have.property('is_active');
    res.body.data[index].should.have.property('created_by');
    res.body.data[index].should.have.property('created_date');
    res.body.data[index].should.have.property('created_name');
    res.body.data[index].should.have.property('created_from');
    res.body.data[index].should.have.property('modified_by');
    res.body.data[index].should.have.property('modified_date');
    res.body.data[index].should.have.property('modified_name');
    res.body.data[index].should.have.property('modified_from');
  } else {
    res.body.data.should.have.property('player_id');
    if (!isEmpty(name)) res.body.data.should.have.property('name').eql(name);
    else res.body.data.should.have.property('name');
    if (!isEmpty(teamId)) res.body.data.should.have.property('team_id').eql(teamId);
    else res.body.data.should.have.property('team_id');
    if (String(deleted).toUpperCase() === 'TRUE') res.body.data.should.have.property('is_active').eql(false);
    else res.body.data.should.have.property('is_active');
    if (String(created).toUpperCase() === 'TRUE') {
      res.body.data.should.have.property('created_by').eql(userId);
      res.body.data.should.have.property('created_date');
      res.body.data.should.have.property('created_name').eql(userName);
      res.body.data.should.have.property('created_from').eql(source);
    } else {
      res.body.data.should.have.property('created_by');
      res.body.data.should.have.property('created_date');
      res.body.data.should.have.property('created_name');
      res.body.data.should.have.property('created_from');
    }
    if (!isEmpty(userId)) res.body.data.should.have.property('modified_by').eql(userId);
    else res.body.data.should.have.property('modified_by');
    res.body.data.should.have.property('modified_date');
    if (!isEmpty(userName)) res.body.data.should.have.property('modified_name').eql(userName);
    else res.body.data.should.have.property('modified_name');
    if (!isEmpty(source)) res.body.data.should.have.property('modified_from').eql(source);
    else res.body.data.should.have.property('modified_from');
  }
}
