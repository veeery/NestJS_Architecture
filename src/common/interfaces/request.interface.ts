import { User } from 'src/modules/public/user/user.entity';

export interface UserRequest extends Request {
  user: User;
}
