import { Transform, TransformFnParams } from 'class-transformer';

export function ToNumber() {
  return Transform((v: TransformFnParams) => {
    let number = Number(v.value);
    if (isNaN(number)) return v.value;
    return number;
  });
}
