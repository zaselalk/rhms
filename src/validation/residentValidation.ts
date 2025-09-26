import * as Yup from 'yup';

export const residentValidation = Yup.object({
    contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number.')
        .required('Contact number is required.'),

    weight: Yup.number()
        .typeError('Weight must be a number')
        .min(0, 'Weight must be greater than or equal to 0')
        .required('Weight is required'),

    height: Yup.number()
        .typeError('Height must be a number')
        .min(0, 'Height must be greater than or equal to 0')
        .required('Height is required'),

    nic: Yup.string()
        .trim()
        .matches(
            /^\d{9}V$|^\d{12}$/,
            "NIC must be 9 digits followed by 'V' or 'X' OR a 12-digit number"
        ),

    email: Yup.string()
        .email('Invalid email format'),

    bloodPressure: Yup.string()
        .matches(/^\d{2,3}\/\d{2,3}$/, 'Blood pressure must be in format: systolic/diastolic (e.g. 120/80)')
        .required('Blood pressure is required'),

    heartRate: Yup.number()
        .typeError('Heart rate must be a number')
        .min(40, 'Heart rate must be at least 40 bpm')
        .max(200, 'Heart rate must be less than or equal to 200 bpm')
        .required('Heart rate is required'),





});