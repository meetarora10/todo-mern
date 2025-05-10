const { getSessionUser } = require('../service/auth');
const User = require('../models/user');
async function restrictAccess(req, res, next) {
    const { uid } = req.cookies;
    if (!uid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = getSessionUser(uid);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();
    }catch(e){
        console.log('Middleware error:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = restrictAccess;