const { NOW_LOGS_SECRET_KEY, NOW_LOGS_PORT = 3000 } = process.env;

if (process.env.NOW_LOGS_SECRET_KEY) {
    require('now-logs')(process.env.NOW_LOGS_SECRET_KEY);
}

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('now-logs-server/server')(io);

app.use(express.static('website'));

http.listen(NOW_LOGS_PORT, () => {
    console.log('listening on port', port);
});
