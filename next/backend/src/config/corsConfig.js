import cors from 'cors';

// List allowed origins dynamically from environment variables
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000', // Local development or env var
    // Add other allowed origins here
];

// Instead of rejecting the request with an error for disallowed origins,
// we allow the request to proceed but add a warning header so the frontend
// can show an alert or take other action. This prevents the server from
// throwing a CORS error and breaking code flow.
const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        // If origin is explicitly allowed, accept it
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // For disallowed origins, do NOT pass an error. Allow the request,
        // but we will mark it with a warning header in the wrapper middleware.
        return callback(null, true);
    },
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // Allow custom header used for API access key (both lowercase and uppercase forms)
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'X-API-KEY'],
    // Expose our custom warning header so the browser can read it
    exposedHeaders: ['X-CORS-Warning']
};

function corsMiddleware(req, res, next) {
    const origin = req.headers.origin;

    // If origin exists and is not in the allowed list, set a warning header.
    // We do not block the request; this lets the frontend decide how to handle it.
    if (origin && !allowedOrigins.includes(origin)) {
        res.setHeader('X-CORS-Warning', 'Origin is not in the allowed list');
    }

    // Delegate to the standard cors middleware with our options
    return cors(corsOptions)(req, res, next);
}

export default corsMiddleware;
