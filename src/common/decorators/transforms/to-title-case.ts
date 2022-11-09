import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

export function ToTitleCase() {
  return Transform((v: TransformFnParams) => {
    if (!v.value) return null;
    let str = (v.value as string).split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1).toLowerCase();
    }
    return str.join(' ');
  });
}
