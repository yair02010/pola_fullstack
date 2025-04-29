    const Joi = require("joi");

    const reviewSchema = Joi.object({
    product: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().allow("")
    });

    module.exports = { reviewSchema };
