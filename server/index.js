const io = require('socket.io')()
const port = 3000

setInterval(() => {
  io.emit('timestamp', (new Date()))
}, 2000);

io.listen(port)