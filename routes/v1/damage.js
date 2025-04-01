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

import {
        validatePostDamage,
        validatePutDamage,
      } from "../../middleware/validation/damage.js";
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
 *         description:
 *           type: string
 *           example: "Severe fire damage"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-14T12:34:56Z"
 *
 *     DamageUpdate:
 *       type: object
 *       properties:
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
 *         description:
 *           type: string
 *           example: "Severe fire damage"
 */

/**
 * @swagger
 * /api/v1/damage:
 *   post:
 *     summary: Create a new damage record
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
 *                   $ref: '#/components/schemas/Damage'
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/", validatePostDamage, recordDamage);

/**
 * @swagger
 * /api/v1/damage:
 *   get:
 *     summary: Get all damage records (with optional filters and sorting)
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: query
 *         name: streetNumber
 *         schema:
 *           type: string
 *         description: Filter damage records by street number
 *       - in: query
 *         name: streetName
 *         schema:
 *           type: string
 *         description: Filter damage records by street name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter damage records by city
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter damage records by region
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter damage records by type (e.g., Fire, Flood, Earthquake)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, streetNumber, streetName, city, region, type]
 *         description: Field to sort the damage records by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the damage records by (default is 'asc')
 *     responses:
 *       '200':
 *         description: A list of filtered and sorted damage records
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
 *         description: No damage records found matching the filters
 *       '500':
 *         description: Internal server error
 */
router.get("/", getDamages);

/**
 * @swagger
 * /api/v1/damage/{id}:
 *   get:
 *     summary: Get a single damage record by ID
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The damage ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved the damage record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Damage'
 *       '404':
 *         description: No damage record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", getDamage);

/**
 * @swagger
 * /api/v1/damage/{id}:
 *   put:
 *     summary: Update a damage record by ID
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The damage ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DamageUpdate'
 *     responses:
 *       '200':
 *         description: Successfully updated the damage record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Damage with the ID {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Damage'
 *       '404':
 *         description: No damage record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", validatePutDamage, updateDamage);

/**
 * @swagger
 * /api/v1/damage/{id}:
 *   delete:
 *     summary: Delete a damage record by ID
 *     tags:
 *       - Damage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The damage ID
 *     responses:
 *       '200':
 *         description: Successfully deleted the damage record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Damage with the ID {id} successfully deleted"
 *       '404':
 *         description: No damage record found with the given ID
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", deleteDamage);

export default router;
