export function checkProblemOneResponse(res, payload = {}) {
  const { question = '' } = payload;
  res.body.data.should.be.a('number');
  return question;
}

export function noop() {}
