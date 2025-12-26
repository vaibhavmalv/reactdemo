import express from 'express';
import path from 'path';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Load ENV
import loadEnvironment from "./src/config/loadEnv.js";
const mode = loadEnvironment();

// DB + middleware
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middleware/errorMiddleware.js';
import corsMiddleware from './src/config/corsConfig.js';


// Routes
import routes from './src/routes/index.js';
import listAllRoutes from "./src/utils/listRoutes.js";
const app = express();

// Middleware
app.use(corsMiddleware);
// Allow larger JSON payloads because profile images are sent as base64 strings
app.use(express.json({ limit: '10mb' }));

// Logger middleware for development
if (mode === "development" || mode === "local") {
    app.use(morgan('dev'));
}

// Use Health Check  routes
app.get('/api/health', (req, res) => {
    const apiRoutes = listAllRoutes(app).filter(r => r.path.startsWith('/api'));

    res.json({
        status: "OK",
        totalRoutes: apiRoutes.length,
        routes: apiRoutes
    });
});


// Use centralized routes
app.use('/api', routes);

// Swagger (local + dev)
if (mode === 'development' || mode === "local") {
    const swaggerDocument = YAML.load('./openapi.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log(`📘 Swagger available at: /api-docs`);
}

app.get('/', (req, res) => res.send('Role Auth API Running 🚀'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} in ${mode} mode`);
    });
});
