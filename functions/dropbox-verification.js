exports.handler = function (event, context, callback) {
  const { headers, queryStringParameters: query } = event;

  console.log(JSON.stringify(event, null, 2));

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

  // Trigger a build
  // Call webhook with some meta for gulp

  callback(null, {
    statusCode: 200,
    body: 'Webhook received from Dropbox. Build triggered.'
  });
}
