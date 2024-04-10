const JWT = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

function createToken(user){
    const payload = {
      _id : user._id,
      fullName: user.fullName,
      email : user.email,
      role: user.role,
    };

    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createToken,
    validateToken,
}