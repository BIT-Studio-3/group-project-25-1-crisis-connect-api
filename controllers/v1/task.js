/**
 * @file Manages all task methods
 * @author Joanna Marowa
 */

import taskRepository from "../../repositories/generic.js"

const createTask = async (req, res) => {
  try {
    await taskRepository.create({
        requirements : req.body.requirements,
        urgency : req.body.urgency,
        resources : req.body.resources,
        assignedTo: req.body.assignedTo,
        supervisor  : req.body.supervisor,
        status  : req.body.status,
        priority : req.body.priority,
        deadline : req.body.deadline,
        completedAt: req.body.completedAt,
        department: req.body.department,
        streetNumber: req.body.streetNumber,
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
      streetName: req.query.streetName || undefined,
        requirements : req.body.requirements|| undefined,
        urgency : req.body.urgency || undefined,
        resources : req.body.resources || undefined,
        assignedTo: req.body.assignedTo || undefined,
        supervisor  : req.body.supervisor || undefined,
        status  : req.body.status || undefined,
        priority : req.body.priority || undefined,
        deadline : req.body.deadline || undefined,
        completedAt: req.body.completedAt || undefined,
        department: req.body.department || undefined,
        streetNumber: req.body.streetNumber || undefined,
    };

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
    const task= await damageRepository.findById(req.params.id);
console.log()
    // Check if there is no institution
    if (!damage) {
      return res.status(404).json({
        message: `No taskrecord with the id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateTask= async (req, res) => {
  try {
    // Find the institution by id
    let task= await damageRepository.findById(req.params.id);

    // Check if there is no institution
    if (!damage) {
      return res.status(404).json({
        message: `No institution with the id: ${req.params.id} found`,
      });
    }

    // Update the institution
    task= await damageRepository.update(req.params.id, {
      // Data to be updated
      type: req.body.type,
      description: req.body.description,
    });

    return res.status(200).json({
      message: `Taskrecord with the id: ${req.params.id} successfully updated`,
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTask= async (req, res) => {
  try {
    const task= await damageRepository.findById(req.params.id);

    if (!damage) {
      return res.status(404).json({
        message: `No taskwith the id: ${req.params.id} found`,
      });
    }

    await damageRepository.delete(req.params.id);

    return res.json({
      message: `Taskrecord with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


export { createTask, getTasks, getTask , updateTask, deleteTask};
