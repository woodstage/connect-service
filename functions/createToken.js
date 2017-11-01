"use strict";

const jwt = require("jsonwebtoken");
const UsersDB = require("mock/UserDB");

const JWT_EXPIRATION_TIME = "600m";

module.exports.handler = (event, context, callback) => {
  const { username, password } = JSON.parse(event.body);

  try {
    // Authenticate user
    // const user = users.login(username, password);
    const user = UsersDB.find(
      user => user.username === username && user.password === password
    );
    if (!user) {
      throw new Error("invalid username/password");
    }

    // Issue JWT
    const token = jwt.sign(
      {
        user: { id: user.id, username: user.username, scopes: user.scopes }
      },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION_TIME
      }
    );
    const response = {
      // Success response
      statusCode: 200,
      body: JSON.stringify({
        token
      })
    };

    // Return response
    callback(null, response);
  } catch (e) {
    const response = {
      // Error response
      statusCode: 401,
      body: JSON.stringify({
        error: e.message
      })
    };
    callback(null, response);
  }
};
