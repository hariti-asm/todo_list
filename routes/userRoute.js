import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Route to add new todo
router.post("/create/", async (request, response) => {
  const { userName, gmail, password } = request.body;
  try {
    if (!userName || !gmail || !password) {
      return response.status(400).send({
        message: "username & email & password are required",
      });
    }
    const userNameCheck = await User.findOne({ userName: userName });
    if (userNameCheck) {
      return response.json({ msg: "userName alraedy exist", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 16);
    const newUser = {
      userName: userName,
      gmail: gmail,
      password: hashedPassword,
    };

    const user = await User.create(newUser);
    delete user.password;
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All todos from database
router.post("/get/:userName", async (request, response) => {
  try {
    const { userName, password } = request.body;

    const user = await User.findOne({ userName: userName });

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!user) {
      return response.json({ msg: "Incorrect userName!", status: false });
    } else if (!passwordIsValid) {
      return response.json({ msg: "Incorrect password!", status: false });
    } else {
      // Remove password before sending user data to the client
      delete user.password;

      return response.status(200).json({ user, status: true });
    }
  } catch (error) {
    console.log(error.message);
    response
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
