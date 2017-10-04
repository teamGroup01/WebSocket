var app = require('http').createServer()
var io = require('socket.io')(app)
var PORT = 3000
app.listen(PORT)
var clientCount = 0

io.on('connection', function(socket) {
	clientCount++
	socket.nickName = 'user' + clientCount
	io.emit('enter', socket.nickName + ':' +  'come in')

	socket.on('message', function(str) {
		io.emit('message', socket.nickName + 'says:' + str)
	})

	socket.on('disconnect', function() {
		io.emit('leave', socket.nickName + 'leave')
	})
})
