import * as chaiHttp from './chaiHttp.util.test';

export function solveProblemOne(token, payload, params, query) {
  return chaiHttp.POST('PROBLEM_ONE', token, payload, params, query);
}

export function solveProblemTwoGet(token, params, query) {
  return chaiHttp.GET('PROBLEM_TWO', token, params, query);
}

export function solveProblemTwoAdd(token, payload, params, query) {
  return chaiHttp.POST('PROBLEM_TWO', token, payload, params, query);
}

export function solveProblemTwoUpdate(token, payload, params, query) {
  return chaiHttp.PUT('PROBLEM_TWO', token, payload, params, query);
}

export function solveProblemTwoDelete(token, payload, params, query) {
  return chaiHttp.DELETE('PROBLEM_TWO', token, payload, params, query);
}

export function noop() {}
