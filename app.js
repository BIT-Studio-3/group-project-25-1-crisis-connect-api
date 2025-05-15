import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import logger from "./middleware/logger.js";

// Import the index routes module
import indexRoutes from "./routes/index.js";
import jwtAuth from "./middleware/jwtauth.js";
import authRoutes from "./routes/auth.js";

import damageRoutes from "./routes/v1/damage.js";
import hazardRoutes from "./routes/v1/hazard.js";
import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();
 
// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });

// Use the routes module
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Emergency Response System API",
            version: "1.0.0",
            description: "A emergency response system API",
            contact: {
                name: "Crisis-Connect",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(isContentTypeApplicationJSON);
app.use("/", indexRoutes);
app.use("/api/v1/damage", damageRoutes);
app.use("/api/v1/hazard", hazardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/auth", authRoutes);
// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});
 
// Export the Express application. May be used by other modules. For example, API testing
export default app;