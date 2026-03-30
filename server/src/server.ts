import { config } from "dotenv"
import express, { type Request, type Response } from "express"
import logRoutes from "./routes/logRoutes.js"
import cors from "cors"
config()
const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/log",logRoutes)


const port = process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`app is listening http://localhost:${port}`)
})

