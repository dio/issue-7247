const Server = require('http').Server;
const getRawBody = require('raw-body');
const server = new Server(async (req, res) => {
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    log(err);
  }
  log(req.method, req.headers, body ? `body=${body.toString()}` : "[no body received]");
  res.end('ok');
});

function log() {
  return console.log.apply(
    console,
    ['[' + new Date().toISOString().slice(11, -5) + ']'].concat(
      Array.prototype.slice.call(arguments)
    )
  );
}

server.listen(8000);
