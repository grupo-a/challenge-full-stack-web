import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpfValid', async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        if (!value || typeof value !== 'string') {
            return false;
        }

        const cpf = value.replace(/[^\d]/g, '');

        if (cpf.length !== 11) {
            return false;
        }

        return true;
    }
}

export function IsCpfValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfValidConstraint,
        });
    };
}