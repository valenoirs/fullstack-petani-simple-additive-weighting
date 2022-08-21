import "dotenv/config.js";
import config from "./config/config";
import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import flash from "connect-flash";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";

// Add user property to express session
// declare module 'express-session' {
//     interface SessionData {
//         user?: any;
//     }
// }

import { tambahPupuk } from "./controllers/pupuk";

// Import Routes
import { router as userRoute } from "./routes/user";
import { router as viewRoute } from "./routes/view";
import { router as petaniRoute } from "./routes/petani";
import { router as pupukRoute } from "./routes/pupuk";

// Init
const app: Express = express();
const port = config.PORT;
const accessLogStream = createStream(`access.log`, {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

// Connect to database
connect(config.MONGO_URI)
  .then(() => {
    console.log("[server]: OK! successfully-connected-to-mongodb");
    tambahPupuk();
  })
  .catch((error) => {
    console.error("[server]: ERR! failed-connecting-to-mongo-database", error);
  });

// Initialize MongoStore
const store = MongoStore.create({
  mongoUrl: config.MONGO_URI,
  collectionName: config.SESSION_COLLECTION_NAME,
});

// Middleware
// app.use(
//   morgan("combined", {
//     stream: accessLogStream,
//   })
// );

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
          "https://unpkg.com/aos@2.3.1/dist/aos.js",
        ],
      },
    },
  })
);

// Session
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // store,
    cookie: {
      maxAge: config.SESSION_LIFETIME,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// User session
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.username = req.session.user.username;
  }

  next();
});

// Templating Engine
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// HTTP Routes
app.use("/", viewRoute);
app.use("/user", userRoute);
app.use("/petani", petaniRoute);
app.use("/pupuk", pupukRoute);

// Ping
app.get("/ping", (req: Request, res: Response) => {
  console.log(`[server]: OK! ${req.headers.host} pinging the server`);
  return res.status(200).send({
    success: true,
    status: 200,
    data: {
      message: "valenoirs",
    },
  });
});

// 404
app.use("/", (req: Request, res: Response) => {
  return res.status(404).send({
    error: true,
    status: 404,
    type: "NotFound",
    data: {
      message: "No API endpoint found.",
    },
  });
});

// Server
app.listen(port, (): void => {
  console.log(`[server]: OK! server running at port ${port}`);
});
