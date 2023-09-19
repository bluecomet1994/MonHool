import { body } from 'express-validator';

const RegisterValidationSchema = [
    body('username')
        .notEmpty()
        .isString(),

    body('email')
        .notEmpty()
        .isEmail(),

    body('password')
        .notEmpty()
        .isString()
        .isLength({ min: 6, max: 30 }),
];

export default RegisterValidationSchema;