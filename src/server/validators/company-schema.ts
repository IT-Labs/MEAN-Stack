import joi = require('@hapi/joi');

export const companySchema = joi.object().keys({
    name: joi.string().required(),
    taxNumber: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    zipcode:joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    created: joi.string().required(),
});
