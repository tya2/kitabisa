import Joi from 'joi';
import { isEmpty } from 'lodash';

export async function problemOne(req, res, next) {
  try {
    const schema = Joi.object().keys({
      question: Joi.string().required(),
    });
    const result = Joi.validate({ ...req.body, ...req.query, ...req.params }, schema);
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      res.status(400).json({
        data: null,
        status: 'ERROR',
        message: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoGet(req, res, next) {
  try {
    const schema = Joi.object().keys({});
    const result = Joi.validate({ ...req.body, ...req.query, ...req.params }, schema);
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      res.status(400).json({
        data: null,
        status: 'ERROR',
        message: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoAdd(req, res, next) {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      teamId: Joi.string().guid().required(),
      userId: Joi.string().required(),
      userName: Joi.string().optional().allow(['', null]),
      source: Joi.string().optional().allow(['', null]),
    });
    const result = Joi.validate({ ...req.body, ...req.query, ...req.params }, schema);
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      res.status(400).json({
        data: null,
        status: 'ERROR',
        message: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoUpdate(req, res, next) {
  try {
    const schema = Joi.object().keys({
      playerId: Joi.string().guid().required(),
      name: Joi.string().optional(),
      teamId: Joi.string().guid().optional(),
      userId: Joi.string().required(),
      userName: Joi.string().optional().allow(['', null]),
      source: Joi.string().optional().allow(['', null]),
    });
    const result = Joi.validate({ ...req.body, ...req.query, ...req.params }, schema);
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      res.status(400).json({
        data: null,
        status: 'ERROR',
        message: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}

export async function problemTwoDelete(req, res, next) {
  try {
    const schema = Joi.object().keys({
      playerId: Joi.string().guid().required(),
      userId: Joi.string().required(),
      userName: Joi.string().optional().allow(['', null]),
      source: Joi.string().optional().allow(['', null]),
    });
    const result = Joi.validate({ ...req.body, ...req.query, ...req.params }, schema);
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      res.status(400).json({
        data: null,
        status: 'ERROR',
        message: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 'ERROR',
      message: error.message,
    });
  }
}
