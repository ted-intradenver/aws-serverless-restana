'use strict';
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const restana = require('restana');
var nowTime = require("performance-now")

// creating service
const service = restana();
const AWS = require('aws-sdk');

var startTime = nowTime();

//-----DynamoDB----------------------
const USERS_TABLE = process.env.USERS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};
//-----END DynamoDB----------------------

service.use(bodyParser.json({ strict: false }));
var startTimeBody = nowTime();

//-----Routing----------------------
// defualt
service.get('/', (req, res) => {
  res.send('Hello World!', 200);
});

/* -[get users:/userId]---------------------------------------------------------------*/
service.get('/users/:userId', (req, res) => {
    
  var startTimeGetUser = nowTime();
    //res.send('Go Serverless v1.0! Your function executed successfully!', 200);
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: req.params.userId,
      },
    }
  
    dynamoDb.get(params, (error, result) => {
      if (error) {
        console.log(error);
        res.send(JSON.stringify({ error: 'Could not get user' }), 400);
      }
      if (result.Item) {
        const {userId, name} = result.Item;
        //res.json({ userId, name }); //express
        res.send(JSON.stringify({ userId, name }), 200, {
          't-start-body': (startTime-startTimeBody).toFixed(3), 't-body-data': (startTimeGetUser-nowTime()).toFixed(3)
      }); //restana
      } else {
        //res.status(404).json({ error: "User not found" }); //express
        res.send(JSON.stringify({ error: 'Could not get user' }), 400); //restana
      }
    });
});

/* -[post users]---------------------------------------------------------------*/
service.post('/users', (req, res) => {
  //res.send('Hello2 Go Serverless v1.0! Your function executed successfully!', 200);
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    //res.status(400).json({ error: '"userId" must be a string' }); /express
    res.send(JSON.stringify({ error: '"userId" must be a string' }), 400);
  } else if (typeof name !== 'string') {
    //res.status(400).json({ error: '"name" must be a string' }); //express
    res.send(JSON.stringify({ error: '"name" must be a string' }), 400);
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      //res.status(400).json({ error: 'Could not create user' }); //express
      res.send(JSON.stringify({ error: 'Could not create user' }), 400);
    }
    //res.json({ userId, name }); //express
    res.send(JSON.stringify({ userId, name }), 200); //restana
  });
});
//-----END Routing----------------------
 
// lambda integration
const app = serverless(service);
module.exports.app = async (event, context) => {
    return await app(event, context);
};