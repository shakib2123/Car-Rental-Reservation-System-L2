import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

//Create the Express.js application
const app = express();

// Set up the middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());

//application routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Car Rental Reservation System API Service!",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
