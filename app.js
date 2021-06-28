// import console from './app/libs/log.js'
import Koa from 'koa'
import { Server } from 'socket.io'
import { createServer } from 'http'
const app = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ['GET', 'POST'],
    credentials: true
  }
})
io.on('connection', async (socket) => {
  socket.broadcast.emit('contact:online', { id: socket.id })
  socket.on("disconnect", (reason) => {
    socket.broadcast.emit('contact:offline', { id: socket.id })
  })
  const sockets = await io.fetchSockets()
  const socketIds = []
  for (let i = 0; i < sockets.length - 1; i++) {
    socketIds.push(sockets[i].id)
  }
  socket.emit('contact:onlineCounts', {
    onlineCounts: socketIds.length,
    onlineIds: socketIds
  })
})

httpServer.listen(3000)