import express from "express";
import mongoose from "mongoose";
import listRoute from "./routes/listRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const Port = process.env.PORT || 5000;
const Host = process.env.DATABASE8_HOST;

console.log("Environment Variables:");
console.log("Port:", Port);
console.log("Database Host:", Host);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to my todo list app");
});

app.use("/todos", listRoute);
app.use("/user", userRoute);

mongoose
  .connect(Host, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("App connected to database");
    app.listen(Port, () => {
      console.log(`Server running at http://localhost:${Port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
