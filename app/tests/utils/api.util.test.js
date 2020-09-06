import * as chaiHttp from './chaiHttp.util.test';

export function solveProblemOne(token, payload, params, query) {
  return chaiHttp.POST('PROBLEM_ONE', token, payload, params, query);
}

export function noop() {}
