const {NOW_LOGS_SECRET_KEY, NOW_LOGS_PORT = 3000} = process.env;

if (NOW_LOGS_SECRET_KEY) {
    require('now-logs')(NOW_LOGS_SECRET_KEY);
}

const micro = require('micro');
const http = micro(() => '');
const io = require('socket.io')(http);
require('./server')(io);

http.listen(NOW_LOGS_PORT, () => {
    console.log(`listening on port ${NOW_LOGS_PORT}`);
});
