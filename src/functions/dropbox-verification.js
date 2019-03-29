const axios = require('axios');

// TODO Add slack notifications
exports.handler = function (event, context, callback) {
  const { headers, queryStringParameters: query } = event;

  if (query.challenge) {
    callback(null, {
      statusCode: 200,
      body: query.challenge,
      headers: {
        "Content-Type": "text/plain",
        "X-Content-Type-Options": "nosniff"
      }
    });
  };

  if (!headers["x-dropbox-signature"]) {
    callback(new Error('Request not from Dropbox'));
  }

  axios
    .post(process.env.WEB_HOOK_DROPBOX, {
      body: {
        source: 'dropbox'
      }
    })
    .then(_ => {
      callback(null, {
        statusCode: 200,
        body: 'Success'
      });
    })
    .catch(error => {
      callback(error);
    });
}
