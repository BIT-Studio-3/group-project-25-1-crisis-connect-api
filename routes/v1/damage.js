/**
 * @file Manages all the routes to damage
 * @author Joanna Marowa
 */
import express from "express";

import {
        recordDamage ,
        getDamages,
        getDamage ,
        updateDamage,
        deleteDamage,
} from "../../controllers/v1/damage.js";

const router = express.Router();

 
/**
 * @swagger
 * components:
 *   schemas:
 *     Damage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         street_name:
 *           type: string
 *           example: "Main St"
 *         street_no:
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
 * /api/v1/damage:
 *   post:
 *     summary: Create a new damage
 *     tags:
 *       - Damage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Damage'
 *     responses:
 *       '201':
 *         description: Damage successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Damage successfully recorded"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Damage'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid damage data provided"
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
router.post("/", recordDamage);
 
/**
 * @swagger
 * /api/v1/damage:
 *   get:
 *     summary: Get all damage
 *     tags:
 *       - Damage
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
 *                     $ref: '#/components/schemas/Damage'
 *       '404':
 *         description: No damage found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No damage record found"
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
router.get("/", getDamages);
 
/**
 * @swagger
 * /api/v1/damage/{id}:
 *   get:
 *     summary: Get a damage by id
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The damage id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Damage'
 *       '404':
 *         description: No damage found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No damage record with the id: {id} found"
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
router.get("/:id", getDamage);
 
/**
 * @swagger
 * /api/v1/damage/{id}:
 *   put:
 *     summary: Update a damage by id
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The damage id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Damage'
 *     responses:
 *       '200':
 *         description: Damage successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Damage with the id: {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Damage'
 *       '404':
 *         description: No damage found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No damage record with the id: {id} found"
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
router.put("/:id", updateDamage);
 
/**
 * @swagger
 * /api/v1/damage/{id}:
 *   delete:
 *     summary: Delete a damage by id
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The damage id
 *     responses:
 *       '200':
 *         description: Damage successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Damage with the id: {id} successfully deleted"
 *       '404':
 *         description: No damage found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No damage record with the id: {id} found"
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
router.delete("/:id", deleteDamage);
 
export default router;
 






