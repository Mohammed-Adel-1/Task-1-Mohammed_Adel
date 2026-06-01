import express from "express";
import { PORT } from "../config/config.service.js";
import checkConnectionDB from "./DB/connectionDB.js";
import authRouter from "./modules/auth.module.js/auth.controller.js";
import userRouter from "./modules/user.module.js/user.controller.js";

// Initiating the server
const app = express();
const port = PORT;

const bootstrap = async () => {
  app.use(express.json());

  checkConnectionDB();

  // Auth Routing
  app.use("/auth", authRouter);
  // User Routing
  app.use("/user", userRouter);

  // Default response
  app.get("/", (req, res) => res.send("Hello, World"));

  // Incprrect URL
  app.use("{/*demo}", (req, res, next) => {
    res.status(404).json({ message: `Url: ${req.originalUrl} not found` });
  });

  // Error handling
  app.use((err, req, res, next) => {
    res
      .status(err.cause || 500)
      .json({ message: err.message, stack: err.stack });
  });

  // Server listening
  app.listen(port, () =>
    console.log(`Server is running on port http://localhost:${port}`),
  );
};

export default bootstrap;