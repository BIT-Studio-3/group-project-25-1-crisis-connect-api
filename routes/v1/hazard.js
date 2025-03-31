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

