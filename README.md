# now-logs-server
The server side for [now-logs](https://logs.now.sh).

## Public server

All `now-logs` streams are tunneled through the public `now-logs-server` hosted at `logs.now.sh`.

You can inspect the public server's code here: https://logs.now.sh/_src

## Private server

While the public server keeps your logs completely private, you can ensure extra privacy and uptime by running your own private `now-logs-server`.

**Step 1**: Clone this repository

**Step 2**: Deploy:
```
now --alias my-private-server.now.sh
```

**Step 3**: Update your code to use the private server:
```
require('now-logs')({
  secret: '<secret-key>',
  url: 'my-private-server.now.sh'
});
```
**Step 4**: See logs with:
```
now-logs -s my-private-server.now.sh <secret-key>
```

## Who made this?

Tal Bereznitskey. Find me on Twitter as [@ketacode](https://twitter.com/ketacode)
