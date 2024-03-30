import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsSlug',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          );
        },
        defaultMessage() {
          return 'The slug ($value) is not valid. A valid slug consists of lowercase letters, can contain numbers, and hyphens.';
        },
      },
    });
  };
}
