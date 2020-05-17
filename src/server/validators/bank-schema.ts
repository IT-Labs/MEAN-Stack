import joi = require('@hapi/joi');

export const bankSchema = joi.object().keys({
    name: joi.string().required(),
    swiftCode: joi.string().required()
});
