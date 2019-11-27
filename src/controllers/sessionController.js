const jwt = require("jsonwebtoken")
const authConfig = require ("../config/auth")
const alunas = require("../model/alunas")

exports.getToken = (req, res) => { 
    const {name} = req.body
    const user = alunas.find(e => e.nome = name)

    if (!user) {
        return res.status(401).json ({ error: "user not found"})
    }
    const {id, nome} = user

    try {
        return res.json ({
            user: {
                id,
                nome,
            },
            //para o jwt, foi passado o payload e a signature. Como passei o dado criptografado, nao precisa passar o header
            
            token: jwt.sign({id}, authConfig.secret,{
                expiresIn: authConfig.expiresIn
            })
        })
        
    } catch (error) {
        return res.status(401).json({error: 'erro'})
        
    }
}