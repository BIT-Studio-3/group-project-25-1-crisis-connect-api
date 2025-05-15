/**
 * @file Manages all the hazard routes
 * @author Mustafa Habibullah
 */

import express from "express";

import {
  createHazard,
  getHazards,
  getHazard,
  updateHazard,
  deleteHazard,
} from "../../controllers/v1/hazard.js";

import {
  validatePostHazard,
  validatePutHazard,
} from "../../middleware/validation/hazard.js";

const router = express.Router();

/**
* @swagger
* components:
*   schemas:
*     Hazard:
*       type: object
*       description: "Represents a hazard event with its details such as location, type, and timestamps of creation and update."
*       properties:
*         id:
*           type: string
*           format: uuid
*           example: "123e4567-e89b-12d3-a456-426614174000"
*           description: "Unique identifier for the hazard event."
*         streetName:
*           type: string
*           example: "Main St"
*           description: "The name of the street where the hazard is located."
*         streetNumber:
*           type: string
*           example: "123"
*           description: "The street number of the address of the hazard."
*         city:
*           type: string
*           example: "New York"
*           description: "The city where the hazard is located."
*         region:
*           type: string
*           example: "NY"
*           description: "The region or state where the hazard is located."
*         type:
*           type: string
*           example: "Fire"
*           description: "The type of hazard event (e.g., Fire, Flood, Earthquake)."
*         description:
*           type: string
*           example: "A large fire has broken out in the city center."
*           description: "A detailed description of the hazard event, providing more information about its nature or impact."
*         createdAt:
*           type: string
*           format: date-time
*           example: "2024-07-14T12:34:56Z"
*           description: "Timestamp when the hazard event was created."
*         updatedAt:
*           type: string
*           format: date-time
*           example: "2024-07-14T12:34:56Z"
*           description: "Timestamp when the hazard event was last updated."
*/


/**
 * @swagger
 * /api/v1/hazard:
 *   post:
 *     summary: Create a new hazard record
 *     tags:
 *       - Hazard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hazard'
 *     responses:
 *       '201':
 *         description: Hazard successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hazard successfully recorded"
 *                 data:
 *                   $ref: '#/components/schemas/Hazard'
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/", validatePostHazard, createHazard);

/**
 * @swagger
 * /api/v1/hazard:
 *   get:
 *     summary: Get all hazard records (with optional filters and sorting)
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: query
 *         name: streetNumber
 *         schema:
 *           type: string
 *         description: Filter hazard records by street number
 *       - in: query
 *         name: streetName
 *         schema:
 *           type: string
 *         description: Filter hazard records by street name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter hazard records by city
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter hazard records by region
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter hazard records by type (e.g., Fire, Flood, Earthquake)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, streetNumber, streetName, city, region, type]
 *         description: Field to sort the hazard records by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the hazard records by (default is 'asc')
 *     responses:
 *       '200':
 *         description: A list of filtered and sorted hazard records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hazard'
 *       '404':
 *         description: No hazard records found matching the filters
 *       '500':
 *         description: Internal server error
 */
router.get("/", getHazards);

/**
 * @swagger
 * /api/v1/hazard/{id}:
 *   get:
 *     summary: Get a single hazard record by ID
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hazard ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved the hazard record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hazard'
 *       '404':
 *         description: No hazard record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", getHazard);

/**
 * @swagger
 * /api/v1/hazard/{id}:
 *   put:
 *     summary: Update a hazard record by ID
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hazard ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hazard'
 *     responses:
 *       '200':
 *         description: Successfully updated the hazard record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hazard with the ID {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Hazard'
 *       '404':
 *         description: No hazard record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", validatePutHazard, updateHazard);

/**
 * @swagger
 * /api/v1/hazard/{id}:
 *   delete:
 *     summary: Delete a hazard record by ID
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hazard record to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted the hazard record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hazard with the ID {id} successfully deleted"
 *       '404':
 *         description: No hazard record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", deleteHazard);

export default router;
