
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;

    if (user && user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

module.exports = checkUserRole;
