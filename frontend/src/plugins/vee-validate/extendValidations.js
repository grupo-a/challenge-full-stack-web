import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate';

// Add a rule.
extend('secret', {
    validate: value => value === 'example',
    message: 'This is not the magic word'
});

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
    ...email,
    message: 'Email must be valid',
})