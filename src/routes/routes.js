const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware imports
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// Public routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Protected dashboard routes
router.get('/dashboard/student', auth, roleAuth(['student']), (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboards/student-dashboard.html'));
});

router.get('/dashboard/admin', auth, roleAuth(['admin']), (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboards/admin-dashboard.html'));
});

router.get('/dashboard/institution', auth, roleAuth(['institution']), (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboards/institution-dashboard.html'));
});

// Handle 404 - Page not found
router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = router;