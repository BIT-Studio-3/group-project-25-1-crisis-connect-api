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
