import express from "express";
import errorHandlerController from "./controllers/errorHandler.controller";
import AppError from "./utils/appError";

// Register Routes
import { AnimieRouter } from "./routes/animie.route";
import UserRouter from "./routes/user.route";
import { AnimieCommentRouter } from "./routes/animieComments.route";
import { EpisodeCommentRouter } from "./routes/episodeComment.route";
import AuthRouter from "./routes/auth.route";
import AdminRouter from "./routes/admin.route";
import bodyParser from "body-parser";
import { EpisodeRouter } from "./routes/episodes";


import cors from "cors";

const app = express();

app.use(bodyParser.json());


interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
  roles:string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);


app.use("/api/v1/animie", AnimieRouter);
app.use("/api/v1/episode", EpisodeRouter);
app.use("/api/v1/animieComment", AnimieCommentRouter);
app.use("/api/v1/episodeComment", EpisodeCommentRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/admin", AdminRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Page ${req.originalUrl} is not found`, 404));
});

app.use(errorHandlerController);

// Export app
export { app };
