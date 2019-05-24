# AWS Serverless Restana

Run serverless applications and REST APIs using the [Restana](https://www.npmjs.com/package/restana) - micro routing framework for [Node.js](https://nodejs.org/), on top of [AWS Lambda](https://aws.amazon.com/lambda/) and [Amazon API Gateway](https://aws.amazon.com/api-gateway/). The template follows the [serverless.com](https://serverless.com) tutorial [Serverless Express Rest API](https://serverless.com/blog/serverless-express-rest-api).

[> Check how much faster!](https://github.com/the-benchmarker/web-frameworks#full-table-1)
> Uses 'find-my-way' router: https://www.npmjs.com/package/find-my-way

What else?  *[Building ultra-fast REST APIs with Node.js (restana vs express vs fastify)](https://medium.com/@kyberneees/building-ultra-fast-rest-apis-with-node-js-and-restana-1d65b0d524b7)*

## Getting Started

### Requirements
Follow the serverless.com (quick start tutorial)[https://serverless.com/framework/docs/providers/aws/guide/quick-start/] to get Node 8.10+, AWS CLI, and Serverless CLI's installed.

## What This Does?
This is a simple Node routing server with three endpoints

`/` is a *get* request that returns the simple 'Hello World!'.

`/users/:userId` a *get* request that returns the specified user record with the id of `userid`.

`/users` a *post* request to add a user record to the database.

 I added in `performance-now` module to see how long each part of the request took.
 I also added code notes to show the differences in calls for ExpressJS vs Restana.

