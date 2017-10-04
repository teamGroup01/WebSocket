var ws = require('nodejs-websocket')
var PORT = 3000

var clientCount = 0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")

	clientCount++
	conn.nickName = 'user' + clientCount

	broadcast(conn.nickName + 'comes in')

	conn.on("text", function (str) {
		console.log("Received " + str)
		broadcast(str)
	})

	conn.on('error', function (error) {
		console.log('error:' + error)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		broadcast(conn.nickName + 'left')
	})
}).listen(PORT)

//建立广播
function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}