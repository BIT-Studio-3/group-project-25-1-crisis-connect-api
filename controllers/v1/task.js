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
