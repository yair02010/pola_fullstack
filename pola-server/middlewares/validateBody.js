    const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
        return res.status(400).json({ message: "Validation error", details: error.details[0].message });
        }
        next();
    };
    };

    module.exports = validateBody;
