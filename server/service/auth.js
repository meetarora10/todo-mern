const jwt = require('jsonwebtoken');

function setSessionUser(user) {
    return jwt.sign({ id: user._id, email: user.email } , process.env.JWT_SECRET);
}
function getSessionUser(token) {
    if (!token) {
        return null;
    }
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }catch(e){
        return null;
    }
}

module.exports = {
    getSessionUser,
    setSessionUser
}