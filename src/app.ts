import express from "express";
import cors from "cors";

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

export default app;
