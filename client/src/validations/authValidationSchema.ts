import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required('This field is required.'),
  password: yup.string().required('This field is required.'),
});

export const registerValidationSchema = yup.object().shape({
  username: yup.string().required('This field is required.'),
  email: yup.string().email().required('This field is required'),
  password: yup.string().max(30, 'Password must be at least 30 characters.').min(6, 'Password must be at least 6 characters.').required('This field is required.'),
});