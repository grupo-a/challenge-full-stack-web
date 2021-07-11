import { Validator } from 'vee-validate';

// // Add a rule.
// Validator.extend('secret', {
//     validate: value => value === 'example',
//     message: 'This is not the magic word'
// });

Validator.extend('xrequired', {
    validate: function (value) {
        if (!value) {
            return { required: true, valid: false };
        }

        return { required: true, valid: true };
    }, // the validation function
    message: 'BOGUS MESSAGE: This field is required',
    computesRequired: true // this is caveat!
});