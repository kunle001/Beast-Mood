import express from "express"
import { AnimieRouter } from "./routes/animie.route"
import { CommentRouter } from "./routes/comment.route"
import bodyParser from "body-parser"
import mongoSanitize from "mongo-sanitize"
import errorHandlerController from "./controllers/errorHandler.controller"
import AppError from "./utils/appError"
import { sendSuccess } from "./utils/response"
import { EpisodeRouter } from "./routes/episodes"
// Register Routes

const app= express()

app.use(bodyParser.json())
// app.use(mongoSanitize())



app.use("/api/v1/animie", AnimieRouter)
app.use("/api/v1/episode", EpisodeRouter)
app.use("/api/v1/comment", CommentRouter)



app.all('*', (req, res, next) => {
    next(new AppError(`Page ${req.originalUrl} is not found`, 404));
});

app.use(errorHandlerController)

// Export app
export {app}