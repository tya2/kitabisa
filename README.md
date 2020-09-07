# Kitabisa BE

## Instructions

#### Running the code

1. Do `git clone https://github.com/adplt/kitabisa.git`.
2. Do `yarn` or npm install on the root project.
3. Put .env config file on the root project.
4. Do `npm start` to run back end.

#### Available scripts

1. Run unit test - `npm run test:windows`
2. Run back end engine - `npm start`
3. Run linter - `npm run lint:fix`
4. Run production environment - `npm run prod:new` or `npm run prod` if previously already run production environment.

### Coding Practices

 - We are using `middleware` to manage request payload validation and `controller` to manage logic process on API.
 - For utilisation function like transform value, http function, etc, we placed it into `utils` folder.
 - We placed all the query function into `queries` folder and DB models into `models` folder.
 - We using .env config file that will be placed into root project to manage the config. Then the .env config file will be structured by `env.config.js` file on `configs` folder. A config folder used to manage all configuration needed for the engine.
 - We placed all the possibility reused function into `functions` folder.
 - We placed all the static variable into `variables` folder.
 - If we using socket into API, we manage all socket namespace into `sockets` folder.
 - We placed all the unit test case into `tests` folder.
 - We placed all the API routing into `routes` folder.
 - We placed all the function for calling the service into `services` folder.

 ## Code Snippets

 - Sample Middleware Snippet:

```
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
```

 - Sample Middleware Snippet:

```
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

```

- Sample Unit Test Case Snippet:

```
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
```

- Sample Config File Snippet:

```
PROD_INT_APP_HOST=
PROD_INT_APP_PORT=
PROD_INT_JWT_SECRET=
PROD_INT_DB_HOST=
PROD_INT_DB_PORT=
PROD_INT_DB_1_NAME=
PROD_INT_DB_2_NAME=
PROD_INT_DB_USER=
PROD_INT_DB_PASSWORD=
PROD_INT_DB_DIALECT=
PROD_INT_SOCKET_HOST=
PROD_INT_SOCKET_PORT=
PROD_INT_SOCKET_SECRET_KEY=
PROD_INT_SOCKET_JWT_KEY=
PROD_INT_SLACK_URL=
PROD_INT_SLACK_ID_ONE=
PROD_INT_SLACK_ID_TWO=
PROD_INT_SLACK_ACCESS_TOKEN=
PROD_INT_REDIS_HOST=
PROD_INT_REDIS_PORT=
```

#### Naming conventions & rules:
- All variable name should be using camel case.
- All the query should be move to query folder, don't place query function to controller.
- All the API should define the middleware function.
- All the API should have unit test case, minimal have successfully scenario test case.
- All the file name should be have 3 parts, first for file name, second for folder name in singular, and third for extension file.
- All the payload function for save or update query should be placed into `payload.util.js` file.
- All the validation function for validate something should be placed into `validation.util.js` file.
- All the validation function for transform value should be placed into `transformer.util.js` file.
- Format response for API should have 3 property: `status`, `data`, `message`.
  for successfully example response:
  ```
  {
    "data": 8400,
    "status": "OK",
    "message": "Solve problem one successfully"
  }
  ```
  for failed response:
  ```
  {
    "data": null,
    "status": "ERROR",
    "message": "Player already exist"
  }
  ```
 - For the logic structure in controller, you should define validation for the payload first before executing manipulation process.
