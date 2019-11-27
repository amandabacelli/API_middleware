const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth")
const {promisify} = require('util')

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error: "token not provided"})
    }

    const [, token] = authHeader.split(' ') //fiz uma descontrução para ignorar a 1 array e considerar a outra vinculando ao token

    //middleware
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        //promisify transforma uma req assincrona em sincrona. tenho que esperar o resultado da req
        req.userId = decoded.id
        return next()
    } catch (error) {
        return res.status(401).json({error: "token invalid"})
        
    }
}