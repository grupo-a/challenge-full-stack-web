import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCpf } from '../validations/cpf.helper';

@ValidatorConstraint({ async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    return isValidCpf(cpf);
  }

  defaultMessage() {
    return 'CPF inválido';
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
