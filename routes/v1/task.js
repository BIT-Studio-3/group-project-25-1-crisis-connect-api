/**
 * @file Manages all the routes to d
 * @author Joanna Marowa
 */
import express from "express";

import {
        createTask,
        getTasks,
        getTask ,
        updateTask,
        deleteTask,
} from "../../controllers/v1/task.js";

import {
        validatePostDamage,
        validatePutDamage,
      } from "../../middleware/validation/task.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       description: Represents an emergency service task including required response details, urgency level, assigned personnel, and status.
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "edca3412-91ba-49b5-bc8e-a7a3219b3e42"
 *           description: Unique task identifier.
 *         description:
 *           type: string
 *           example: "Respond to fire outbreak at 120 Queen Street"
 *           description: Description of the emergency task or incident.
 *         requirements:
 *           type: string
 *           example: "Fire extinguishers, water hoses, oxygen masks"
 *           description: Equipment or conditions required to handle the emergency.
 *         urgency:
 *           type: string
 *           example: "Critical"
 *           description: Indicates urgency level (e.g., Low, Medium, High, Critical).
 *         resources:
 *           type: string
 *           example: "2 fire trucks, 1 ambulance, 6 personnel"
 *           description: Resources allocated or needed for the task.
 *         assignedTo:
 *           type: string
 *           example: "Unit A1 - Fire Response Team"
 *           description: The unit or personnel assigned to the task.
 *         supervisor:
 *           type: string
 *           example: "Chief Morgan"
 *           description: Name of the supervisor overseeing the response.
 *         status:
 *           type: string
 *           example: "Dispatched"
 *           description: Current task status (e.g., Pending, Dispatched, In Progress, Completed).
 *         priority:
 *           type: integer
 *           example: 1
 *           description: Numerical representation of priority (1 = highest).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-30T08:15:00Z"
 *           description: Timestamp when the task was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-30T08:45:00Z"
 *           description: Timestamp when the task was last updated.
 *         deadline:
 *           type: string
 *           format: date-time
 *           example: "2025-05-30T09:00:00Z"
 *           description: Optional deadline by which the task must be responded to or completed.
 *         completedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-30T08:58:00Z"
 *           description: Timestamp when the task was completed.
 *         department:
 *           type: string
 *           example: "Fire Department"
 *           description: Emergency department responsible for the task.
 */

/**
 * @swagger
 * /api/v1/emergency/task:
 *   post:
 *     summary: Create a new emergency task
 *     tags:
 *       - Emergency Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Emergency task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Emergency task successfully created"
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/", createTask);

/**
 * @swagger
 * /api/v1/emergency/task:
 *   get:
 *     summary: Get all emergency tasks
 *     tags:
 *       - Emergency Task
 *     responses:
 *       '200':
 *         description: A list of emergency tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Internal server error
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/v1/emergency/task/{id}:
 *   get:
 *     summary: Get an emergency task by ID
 *     tags:
 *       - Emergency Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       '200':
 *         description: Task successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", getTask);

