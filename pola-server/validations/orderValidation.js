    const Joi = require("joi");

    const orderValidationSchema = Joi.object({
    items: Joi.array()
        .items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
        })
        )
        .min(1)
        .required(),

    deliveryMethod: Joi.string().valid("pickup", "delivery").required(),
    paymentMethod: Joi.string().valid("credit_card", "cash_in_store", "cash_on_delivery").required(),

    shippingAddress: Joi.object({
        street: Joi.string().allow(""),
        houseNumber: Joi.string().allow(""),
        city: Joi.string().allow(""),
        zipCode: Joi.string().allow(""),
        floor: Joi.string().allow(""),
        apartment: Joi.string().allow(""),
        entrance: Joi.string().allow("")
    }).optional()
    });

    module.exports = { orderValidationSchema };
