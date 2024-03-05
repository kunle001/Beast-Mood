import express from "express"
import { AnimieRouter } from "./routes/animie"
import bodyParser from "body-parser"
import mongoSanitize from "mongo-sanitize"
// Register Routes

const app= express()

app.use(bodyParser.json())
app.use(mongoSanitize)



app.use("/api/v1/.animie", AnimieRouter)

// Export app
export {app}