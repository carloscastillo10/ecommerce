const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
    // Middleware normal de manera dinamica
    return (req, res, next) => {
        /*
            property puede ser:
                - req.body
                - req.params
                - req.query
         */
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
}

module.exports = validatorHandler;
