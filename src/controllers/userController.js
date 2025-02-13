const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const userController = {
    async register(req, res) {
        try {
            // Check for existing email
            const existingEmail = await User.findOne({ email: req.body.email });
            if (existingEmail) {
                return res.status(400).json({
                    error: 'duplicate',
                    field: 'email',
                    message: 'Email already exists'
                });
            }

            // Check for existing username
            const existingUsername = await User.findOne({ username: req.body.username });
            if (existingUsername) {
                return res.status(400).json({
                    error: 'duplicate',
                    field: 'username',
                    message: 'Username already exists'
                });
            }

            const user = new User(req.body);
            await user.save();
            const token = jwt.sign({ id: user._id }, JWT_SECRET);
            res.cookie('token', token, { expires: new Date(Date.now() + 60 * 60 * 24000) }); // 24 hour
            res.cookie('userRole', req.body.role, { expires: new Date(Date.now() + 60 * 60 * 24000) }); // 24 hour
            res.status(201).send({ user, token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).send({ error: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET);
            // add cookie
            res.cookie('token', token, { expires: new Date(Date.now() + 60 * 60 * 24000) }); // 24 hour
            res.cookie('userRole', user.role, { expires: new Date(Date.now() + 60 * 60 * 24000) }); // 24 hour
            res.send({ user, token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },

    async logout(req, res) {
        try {
            res.clearCookie('token');
            res.clearCookie('userRole');
            res.redirect('/');
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = userController;
