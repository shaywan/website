exports.handler = function (event, context, callback) {
  const { queryStringParameters: query } = event;

  console.log(JSON.stringify(event, null, 2));

  if (!headers["x-dropbox-signature"]) {
    callback(new Error('Request not from Dropbox'));
  }

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

  callback(null, 'default');
}
