const UsersDB = require("mock/UserDB");

module.exports.handler = (event, context, callback) => {
  const user = JSON.parse(event.requestContext.authorizer.user);
  const profile = UsersDB.find(u => u.id === user.id);

  const response = {
    // Success response
    statusCode: 200,
    body: JSON.stringify({
      data: profile
    })
  };
  callback(null, response);
};
