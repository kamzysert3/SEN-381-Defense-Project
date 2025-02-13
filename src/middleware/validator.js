const validateStudent = (req, res, next) => {
    const { studentId, name, course, grade } = req.body;
    
    if (!studentId || !name || !course || !grade) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof grade !== 'number' || grade < 0 || grade > 100) {
        return res.status(400).json({ error: 'Invalid grade value' });
    }

    next();
};

const validateUser = (req, res, next) => {
    const { username, password, email, role } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    next();
};

module.exports = { validateStudent, validateUser };
