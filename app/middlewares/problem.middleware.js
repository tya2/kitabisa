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

export function noop() {}
