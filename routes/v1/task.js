/**
 * @file Manages all the task routes
 * @author Joanna Marowa
*/

import express from "express";

import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
} from "../../controllers/v1/task.js";

/*import {
    validatePostTask,
    validatePutTask,
    } from "../../middleware/validation/task.js";
    */
   
   const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       description: "Represents an emergency service task, detailing incident specifics, assigned resources, and timing."
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "8c10f0a2-4d3a-11ec-81d3-0242ac130003"
 *           description: "Unique identifier for the emergency task."
 *         description:
 *           type: string
 *           example: "Fire outbreak at residential building, 3rd floor."
 *           description: "Detailed description of the emergency task."
 *         requirements:
 *           type: string
 *           example: "Fire trucks, breathing apparatus, medical kits"
 *           description: "Equipment or conditions required to handle the task."
 *         urgency:
 *           type: string
 *           example: "Critical"
 *           description: "Urgency level indicating the criticality of the task."
 *         resources:
 *           type: string
 *           example: "4 firefighters, 2 ambulances"
 *           description: "Resources allocated or required for this task."
 *         assignedTo:
 *           type: string
 *           example: "team_alpha"
 *           description: "Team or individual assigned to the task."
 *         supervisor:
 *           type: string
 *           example: "chief_jones"
 *           description: "Supervisor responsible for overseeing the task."
 *         status:
 *           type: string
 *           example: "dispatched"
 *           description: "Current status of the task."
 *         priority:
 *           type: integer
 *           example: 1
 *           description: "Priority of the task, with 1 as the highest."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-26T14:00:00Z"
 *           description: "Timestamp when the task was created."
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-26T14:30:00Z"
 *           description: "Timestamp when the task was last updated."
 *         deadline:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-05-26T15:30:00Z"
 *           description: "Optional deadline to complete the task."
 *         completedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-05-26T15:10:00Z"
 *           description: "Timestamp when the task was completed."
 *         department:
 *           type: string
 *           example: "Fire Department"
 *           description: "Department responsible for managing the task."
 */

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     summary: Create a new task record
 *     tags:
 *       - Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task successfully recorded"
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
 * /api/v1/task:
 *   get:
 *     summary: Get all task records (with optional filters and sorting)
 *     tags:
 *       - Task
 *     parameters:
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filter task records by description
 *       - in: query
 *         name:  requirements
 *         schema:
 *           type: string
 *         description: Filter task records by  requirements
 *       - in: query
 *         name: urgency
 *         schema:
 *           type: string
 *         description: Filter task records by urgency
 *       - in: query
 *         name: resources
 *         schema:
 *           type: string
 *         description: Filter task records by resources
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         description: Filter task records by who the task is assigned to  (e.g., Fire Department,Fulton Hogan)
 *        - in: query
 *         name: supervisor
 *         schema:
 *           type: string
 *         description: Filter task records by supervisor
 *       - in: query
 *         name:  status
 *         schema:
 *           type: string
 *         description: Filter task records by status
 *   - in: query
 *         name:  priority
 *         schema:
 *           type: integer
 *         description: Filter task records by priority
 *  - in: query
 *         name:  deadline
 *         schema:
 *           type: date-time 
 *         description: Filter task records by deadline 
 * - in: query
 *         name:  completedAt:
 *         schema:
 *           type: date-time 
 *         description: Filter task records by completedAt
 * - in: query
 *         name:  department
 *         schema:
 *           type: date-time 
 *         description: Filter task records by department
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, streetNumber, streetName, urgency, resources, type]
 *         description: Field to sort the task records by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the task records by (default is 'asc')
 *     responses:
 *       '200':
 *         description: A list of filtered and sorted task records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       '404':
 *         description: No task records found matching the filters
 *       '500':
 *         description: Internal server error
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     summary: Get a single task record by ID
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved the task record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: No task record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", getTask);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Update a task record by ID
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Successfully updated the task record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task with the ID {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       '404':
 *         description: No task record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Delete a task record by ID
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task record to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted the task record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task with the ID {id} successfully deleted"
 *       '404':
 *         description: No task record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", deleteTask);

export default router;

