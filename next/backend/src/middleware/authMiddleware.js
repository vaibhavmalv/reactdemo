// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// middleware/authMiddleware.js
const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();

    } catch (err) {
        // TOKEN EXPIRED
        return res.status(401).json({
            message: 'Token expired',
            expired: true
        });
    }
};


// Middleware to check roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }

        next();
    };
};

export { protect, authorizeRoles };
