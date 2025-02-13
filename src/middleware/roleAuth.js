const roleAuth = (allowedRoles) => {
    // Return the middleware function directly
    return (req, res, next) => {
        try {
            const token = req.cookies.userRole;
            if (!token) {
                return res.status(401).json({ message: 'Authentication required' });
            }

            if (allowedRoles.includes(token)) {
                req.userRole = token;
                return next();
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Invalid authentication token' });
        }
    };
};

module.exports = roleAuth;