const Ajv = require("ajv").default;
const httpCode = require('../config/httpStatusCode');


module.exports = function(schemas){
    return function (req, res, next) {
        const ajv = new Ajv();
        const validate = ajv.compile(schemas);

        var valid = validate(req.body);
        if (!valid) {
                return res.status(httpCode.CLIENT_ERRORS.BAD_REQUEST).json(validate.errors);
        }
      
        next();
      };
};

  

