const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkIpiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.api_key) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

module.exports = { checkIpiKey };
