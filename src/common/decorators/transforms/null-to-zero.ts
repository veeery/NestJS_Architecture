import { TransformFnParams } from 'class-transformer';
import { Transform } from 'class-transformer';

export function NullToZero() {
  return Transform((v: TransformFnParams) => {
    if (v.value == null) return 0;
    return v.value;
  });
}
