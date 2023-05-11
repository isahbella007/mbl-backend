const Joi  = require('joi')
const loginValidation = data => { 
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .min(6)
          .required(),
    });
    // console.log("schema", schema)
    return schema.validate(data)
}
module.exports = loginValidation