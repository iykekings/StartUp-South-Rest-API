import Joi from 'joi';
import bcrypt from 'bcryptjs';

export default {
  encryptPassword(plainText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  },
  validateSignUp(body) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string().required(),
      company: Joi.string(),
      position: Joi.string(),
      location: Joi.string().required(),
      points: Joi.number().integer(),
      password: Joi.string().required(),
      role: Joi.number().integer()
    });

    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  comparePassword(plainText, encryptedPassword) {
    return bcrypt.compare(plainText, encryptedPassword);
  },

  validateLogin(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  }
};
