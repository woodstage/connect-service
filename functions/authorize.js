"use strict";

const jwt = require("jsonwebtoken");
const utils = require('../lib/utils');

module.exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded.user;
    const effect = 'Allow';
    const authorizerContext = { user: JSON.stringify(user) };
    const policyDocument = utils.buildIAMPolicy(user.id, effect, event.methodArn, authorizerContext);
    callback(null, policyDocument);
  } catch (e) {
    callback("Unauthorized"); // Return a 401 Unauthorized response
  }
};