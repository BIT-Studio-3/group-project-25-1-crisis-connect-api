import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
 
// Import the index routes module
import indexRoutes from "./routes/index.js";

import damageRoutes from "./routes/v1/damage.js";
import hazardRoutes from "./routes/v1/hazard.js";
import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();
 
// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;
 
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
    apis: ["./routes/v1/*.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(isContentTypeApplicationJSON);
app.use("/", indexRoutes);
app.use("/api/v1/damage", damageRoutes);
app.use("/api/v1/hazard", hazardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
 
// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});
 
// Export the Express application. May be used by other modules. For example, API testing
export default app;