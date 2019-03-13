const admin = (req, res, next) => {
    const {isAdmin} = req.user;
    if (!isAdmin) {
        return res.status(400).json({msj: `Request denied, you don't have admin rights`});
    }
    next();
};

module.exports = admin;
