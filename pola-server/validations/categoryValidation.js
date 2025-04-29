    const Joi = require("joi");

    const categorySchema = Joi.object({
    name: Joi.string().min(2).required()
    });

    module.exports = { categorySchema };
