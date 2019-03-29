const axios = require('axios');

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
    // TODO Send a notification somewhere
    callback(new Error('Request not from Dropbox'));
  }

  axios
    .post(process.env.WEB_HOOK_DROPBOX, {
      statusCode: 200,
      body: {
        source: 'dropbox'
      }
    })
    .then(_ => {
      callback(null, {
        statusCode: 200,
        body: 'Build successfully triggered from Dropbox webhook'
      });
    })
    .catch(error => {
      callback(error);
    });
}
