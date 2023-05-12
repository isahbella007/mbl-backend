const db_connection = require('../config/connection')
const loginValidation = require('../validate/authValidation')
const jwt = require('jsonwebtoken')
const authRouter = require('express').Router()

authRouter.post('/', (req, res) => { 
    const {error} = loginValidation(req.body)
    if(error) return res.send(error.details[0].message)

    const {name, password} = req.body
    db_connection.getConnection(function(err, connection){ 
        if(err){ 
            connection.release()
            console.log("Error getting database connection", err)
        }
        connection.query('select * from user where name = ? and password = ?', [name, password], (error, result) => { 
            if(error) return res.status(500).json({message: error})
            if(result.length === 0) return res.status(401).json({error: 'Invalid username or password'})
            
            const user_id = result[0].id
            const token = jwt.sign({
                _id: user_id
            }, process.env.secret)
            connection.release()
            return res.json({token: token, id: user_id, name: result[0].name})
        })
        
    })
    // db_connection.query()
})

module.exports = authRouter