var ws = require('nodejs-websocket')
var PORT = 3000

var clientCount = 0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")

	clientCount++
	conn.nickName = 'user' + clientCount

	var msg = {
		type: 'enter',
		data: conn.nickName + 'come in'
	}

	broadcast(JSON.stringify(msg))

	conn.on("text", function (str) {
		console.log("Received " + str)
		var msg = {
			type: 'message',
			data: conn.nickName + 'says:' + str
		}
	
		broadcast(JSON.stringify(msg))
	})

	conn.on('error', function (error) {
		console.log('error:' + error)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		var msg = {
			type: 'leave',
			data: conn.nickName + 'left'
		}
	
		broadcast(JSON.stringify(msg))
	})
}).listen(PORT)

//建立广播
function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}