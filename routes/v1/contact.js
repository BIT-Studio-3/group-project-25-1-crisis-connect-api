/**
 * @file Manages all the routes to contact messages
 * @author Mustafa Habibullah
 */

import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../../controllers/v1/contact.js";

import {
  validatePostContact,
  validatePutContact,
} from "../../middleware/validation/contact.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           example: "jane.doe@example.com"
 *         message:
 *           type: string
 *           example: "There is a flood near my home."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-11T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-11T10:00:00Z"
 */

/**
 * @swagger
 * /api/v1/contact:
 *   post:
 *     summary: Create a new contact message
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Contact message successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.post("/", validatePostContact, createContact);

/**
 * @swagger
 * /api/v1/contact:
 *   get:
 *     summary: Get all contact messages
 *     tags:
 *       - Contact
 *     responses:
 *       '200':
 *         description: A list of contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       '500':
 *         description: Internal server error
 */
router.get("/", getAllContacts);

/**
 * @swagger
 * /api/v1/contact/{id}:
 *   get:
 *     summary: Get a contact message by ID
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved the contact message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       '404':
 *         description: Contact message not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", getContactById);

/**
 * @swagger
 * /api/v1/contact/{id}:
 *   put:
 *     summary: Update a contact message by ID
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '200':
 *         description: Contact message successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       '404':
 *         description: Contact message not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", validatePutContact, updateContact);

/**
 * @swagger
 * /api/v1/contact/{id}:
 *   delete:
 *     summary: Delete a contact message by ID
 *     tags:
 *       - Contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       '200':
 *         description: Contact message successfully deleted
 *       '404':
 *         description: Contact message not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", deleteContact);

export default router;
