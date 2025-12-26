import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = '15m';

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already used' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hash, role: role || 'user' });
        res.status(201).json({ message: 'User created', user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Missing email' });

        const user = await User.findOne({ email });
        // do not reveal whether user exists
        if (!user) return res.json({ message: 'If that email exists, a reset link will be sent' });

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        const resetLink = `${clientUrl}/auth/password-reset/${token}`;

        // try to send email via nodemailer if SMTP configured, otherwise log
        const smtpHost = process.env.SMTP_HOST;
        if (smtpHost) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: (process.env.SMTP_SECURE === 'true'),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            const mailOptions = {
                from: process.env.SMTP_FROM || 'noreply@example.com',
                to: user.email,
                subject: 'Password reset',
                text: `You requested a password reset. Click the link to reset: ${resetLink}`,
                html: `<p>You requested a password reset. Click the link to reset:</p><p><a href="${resetLink}">${resetLink}</a></p>`
            };

            await transporter.sendMail(mailOptions);
        } else {
            console.log('Password reset link (no SMTP configured):', resetLink);
        }

        res.json({ message: 'If that email exists, a reset link will be sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        if (!token || !password) return res.status(400).json({ message: 'Missing token or password' });

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export { register, login, requestPasswordReset, resetPassword };
