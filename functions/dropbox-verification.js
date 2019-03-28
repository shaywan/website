exports.handler = function (event, context, callback) {
  const { queryStringParameters: query } = event;

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
