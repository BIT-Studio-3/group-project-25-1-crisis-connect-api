/**
 * @file Manages all task methods
 * @author Joanna Marowa
 */

import GenericRepository from "../../repositories/generic.js";

const taskRepository = new GenericRepository('task');

const createTask = async (req, res) => {
  try {
    await taskRepository.create({
        description : req.body.description,
        requirements : req.body.requirements,
        urgency : req.body.urgency,
        resources : req.body.resources,
        assignedTo: req.body.assignedTo,
        supervisor  : req.body.supervisor,
        status  : req.body.status,
        deadline : req.body.deadline,
        completedAt: req.body.completedAt,
        department: req.body.department 
    });

    // Get all tasks from the task table
    const newTasks = await taskRepository.findAll();

    // Send JSON response
    return res.status(201).json({
      message: "Task successfully created",
      data: newTasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const filters = {
      description: req.query.description || undefined,
        requirements : req.body.requirements|| undefined,
        urgency : req.body.urgency || undefined,
        resources : req.body.resources || undefined,
        assignedTo: req.body.assignedTo || undefined,
        supervisor  : req.body.supervisor || undefined,
        status  : req.body.status || undefined,
        deadline : req.body.deadline || undefined,
        completedAt: req.body.completedAt || undefined,
        department: req.body.department || undefined
    }

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const tasks = await taskRepository.findAll(filters, sortBy, sortOrder);

    // Check if there are no tasks
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTask= async (req, res) => {
  try {
    const task= await taskRepository.findById(req.params.id);
console.log()
    // Check if there is no task
    if (!task) {
      return res.status(404).json({
        message: `No task record with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateTask= async (req, res) => {
  try {
    // Find the task by id
    let task= await taskRepository.findById(req.params.id);

    // Check if there is no task
    if (!task) {
      return res.status(404).json({
        message: `No task with the id: ${req.params.id} found`,
      });
    }

    // Update the task
    task= await taskRepository.update(req.params.id, {
      // Data to be updated
        urgency : req.body.urgency,
        status  : req.body.status,
        completedAt: req.body.completedAt,
    });

    return res.status(200).json({
      message: `Task record with the id: ${req.params.id} successfully updated`,
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTask= async (req, res) => {
  try {
    const task= await taskRepository.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: `No task with the id: ${req.params.id} found`,
      });
    }

    await taskRepository.delete(req.params.id);

    return res.json({
      message: `Task record with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


export { createTask, getTasks, getTask , updateTask, deleteTask};
