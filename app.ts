import express from "express"
import { AnimieRouter } from "./routes/animie.route"
import UserRouter from "./routes/user.route"
import { AnimieCommentRouter } from "./routes/animieComments.route"
import { EpisodeCommentRouter } from "./routes/episodeComment.route"
import AuthRouter  from "./routes/auth.route"
import bodyParser from "body-parser"
// import mongoSanitize from "mongo-sanitize"
// import mongoSanitize from "mongo-sanitize"
import errorHandlerController from "./controllers/errorHandler.controller"
import AppError from "./utils/appError"
import { sendSuccess } from "./utils/response"
import { EpisodeRouter } from "./routes/episodes"
// Register Routes

const app= express()

app.use(bodyParser.json())
// app.use(mongoSanitize())

interface UserBasicInfo {
    _id: string;
    name: string;
    email: string;
  }
  
  declare global {
    namespace Express {
      interface Request {
        user?: UserBasicInfo | null;
      }
    }
  }


app.use("/api/v1/animie", AnimieRouter)
app.use("/api/v1/episode", EpisodeRouter)
app.use("/api/v1/animieComment", AnimieCommentRouter)
app.use("/api/v1/episodeComment", EpisodeCommentRouter)

app.use("/api/v1/.animie", AnimieRouter)
app.use("/api/v1/.user", UserRouter)
app.use("/api/v1/.auth", AuthRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Page ${req.originalUrl} is not found`, 404));
});

app.use(errorHandlerController)

// Export app
export {app}