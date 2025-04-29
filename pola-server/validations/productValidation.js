    const Joi = require("joi");

    const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    size: Joi.string().valid("XS", "S", "M", "L", "XL").required(),
    color: Joi.string().allow(""),
    status: Joi.string().valid("new", "used").default("used"),
    category: Joi.string().required(),
    imageUrl: Joi.string().uri().allow(""),
    inStock: Joi.boolean()
    });

    module.exports = { productSchema };
