/*
 * const timestamp = Math.round(new Date() / 1000);
 * console.log('timestamp: ', timestamp);
*/

export function calculateX(statement = '') {
  let X = 0;
  let firstOperator = 0;
  const newStatement = [];

  for (let i = 0; i < statement.length; i += 1) {
    if (statement[i] === '-' || statement[i] === '+') {
      firstOperator = i;
      let secondOptIdx = 0;
      let rightNumber = '';
      for (let j = i + 1; j < statement.length; j += 1) {
        if (statement[j] === '-' || statement[j] === '+') {
          secondOptIdx = j;
          break;
        }
        if (j === statement.length - 1) {
          let k = statement.length - 1;
          while (!(statement[k] === '-' || statement[k] === '+')) {
            if (/^\d+$/.test(statement[j])) rightNumber = `${statement[k]}${rightNumber}`;
            k -= 1;
          }
        }
      }
      if (!rightNumber) {
        for (let j = firstOperator + 1; j < secondOptIdx; j += 1) {
          if (/^\d+$/.test(statement[j])) rightNumber = `${rightNumber}${statement[j]}`;
        }
      }

      if (newStatement.length === 0) {
        let leftNumber = '';
        for (let j = firstOperator - 1; j >= 0; j -= 1) {
          if (/^\d+$/.test(statement[j])) leftNumber = `${statement[j]}${leftNumber}`;
        }
        newStatement.push(leftNumber);
        newStatement.push(statement[i]);
        newStatement.push(rightNumber);
        switch (statement[i]) {
          case '-':
            X = Number(leftNumber) - Number(rightNumber);
            break;
          case '+':
            X = Number(leftNumber) + Number(rightNumber);
            break;
          default:
            break;
        }
      } else {
        switch (statement[i]) {
          case '-':
            X -= Number(rightNumber);
            break;
          case '+':
            X += Number(rightNumber);
            break;
          default:
            break;
        }
        newStatement.push(statement[i]);
        newStatement.push(rightNumber);
      }
    }
  }
  return X;
}

export function noop() {}
