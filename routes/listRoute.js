import express from "express";
import { List } from "../models/listModel.js";

const router = express.Router();

// Route to add new todo
router.post("/create/", async (request, response) => {
  try {
    if (!request.body.content) {
      return response.status(400).send({
        message: "one field or more are missing",
      });
    }
    const newTask = {
      user_id: request.body.user_id,
      content: request.body.content,
      priority: request.body.priority,
      date: request.body.date,
    };

    const user = await List.create(newTask);

    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All todos from database
router.get("/get/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const todoList = await List.find({ user_id: id });

    return response.status(200).json({ todoList });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update One item from database by id
router.put("/update/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const todo = await List.findByIdAndUpdate(
      { _id: id },
      { status: "complete" }
    );

    return response.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route for Delete a one item
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await List.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "todo not found" });
    }

    return response.status(200).send({ message: "todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
