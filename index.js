import express from "express";
import nodemailer from "nodemailer";
import path from "path";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./modules/userschema.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.URI;
app.use(cors());
app.use(express.json());
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
// app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
app.get("/search", async (req, res) => {
  const value = await User.findOne({ name: req.query.name });
  res.send(value);
});
app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});
app.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    let mailOptions = {
      from: process.env.SMTP_USER,
      to: req.body.email,
      subject: "Registration Confirmed",
      text: "You have successfully registered to our website",
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("error sending email", err);
      } else {
        console.log("email sent successfully");
      }
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
