const http = require('http');

const app = require('./server/prod');
const server = http.createServer(app);

const PORT = 8080;

server.listen(PORT, () => {
  console.log("Listening on port %s", server.address().port);
});
