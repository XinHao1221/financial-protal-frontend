import * as yup from 'yup';

// Validation Message
const requiredField = 'This field is required';
const invalidEmailAddress = 'Email Address is invalid.';

export const validationRules = {
  email: yup.string().email(invalidEmailAddress).required(requiredField),
  required: yup.string().required(requiredField)
};
