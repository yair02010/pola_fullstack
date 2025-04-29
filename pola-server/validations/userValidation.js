    const Joi = require("joi");

    const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().allow(""),
    address: Joi.object({
        city: Joi.string().allow(""),
        street: Joi.string().allow(""),
        houseNumber: Joi.string().allow(""),
        floor: Joi.string().allow(""),
        apartment: Joi.string().allow(""),
        entrance: Joi.string().allow(""),
        zipCode: Joi.string().allow("")
    }).optional()
    });

    const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    });

    module.exports = { registerSchema, loginSchema };