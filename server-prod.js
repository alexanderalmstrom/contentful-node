const app = require('./lambda');

const PORT = 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
