import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

//Create the Express.js application
const app = express();

// Set up the middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Car Rental Reservation System API Service!",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
