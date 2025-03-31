import express from "express";
import {
  createHazard,
  getHazards,
  getHazard,
  updateHazard,
  deleteHazard,
} from "../../controllers/v1/hazard.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Hazard:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         streetName:
 *           type: string
 *           example: "Main St"
 *         streetNumber:
 *           type: string
 *           example: "123"
 *         city:
 *           type: string
 *           example: "New York"
 *         region:
 *           type: string
 *           example: "NY"
 *         type:
 *           type: string
 *           example: "Fire"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 */

/**
 * @swagger
 * /api/v1/hazards:
 *   post:
 *     summary: Create a new hazard
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hazard'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid hazard data provided"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post("/", createHazard);

/**
 * @swagger
 * /api/v1/hazards:
 *   get:
 *     summary: Get all hazards
 *     tags:
 *       - Hazard
 *     responses:
 *       '200':
 *         description: Success
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
 *         description: No hazards found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hazards record found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/", getHazards);

/**
 * @swagger
 * /api/v1/hazards/{id}:
 *   get:
 *     summary: Get a hazard by id
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hazard id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hazard'
 *       '404':
 *         description: No hazard found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hazard record with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/:id", getHazard);

/**
 * @swagger
 * /api/v1/hazards/{id}:
 *   put:
 *     summary: Update a hazard by id
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hazard id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hazard'
 *     responses:
 *       '200':
 *         description: Hazard successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hazard with the id: {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Hazard'
 *       '404':
 *         description: No hazard found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hazard record with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put("/:id", updateHazard);

/**
 * @swagger
 * /api/v1/hazards/{id}:
 *   delete:
 *     summary: Delete a hazard by id
 *     tags:
 *       - Hazard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hazard id
 *     responses:
 *       '200':
 *         description: Hazard successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hazard with the id: {id} successfully deleted"
 *       '404':
 *         description: No hazard found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hazard record with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.delete("/:id", deleteHazard);

export default router;