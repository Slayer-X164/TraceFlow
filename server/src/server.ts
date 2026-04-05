import { config } from "dotenv"
import express, { type Request, type Response } from "express"
import logRoutes from "./routes/logRoutes.js"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "node:http"

config()
const app = express()
const server = createServer(app)
const io = new Server(server,{
  cors:{
    origin:process.env.CLIENT_URL
  }
})
app.use(express.json())
app.use(cors())
app.set("io",io)

app.use("/api/log",logRoutes)


const port = process.env.PORT || 3000
server.listen(port,()=>{
  console.log(`app is listening http://localhost:${port}`)
})

