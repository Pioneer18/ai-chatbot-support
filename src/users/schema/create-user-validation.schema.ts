import * as joi from '@hapi/joi';
/**
 * **summary**: validate the requested new User data confirms to the User model
 */
export const CreateUserValidation = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phoneNumber: joi.string().required(),
});
