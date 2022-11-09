import { Transform, TransformFnParams } from 'class-transformer';

export function ToObject() {
  return Transform((v: TransformFnParams) => {
    if (v.value == 'object') return v;
    if (!v.value) return false;
    return JSON.parse(v.value);
  });
}
