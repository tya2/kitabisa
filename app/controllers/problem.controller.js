import { calculateX } from '../functions/problemOne.function';

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

export function noop() {}
