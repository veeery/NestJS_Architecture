import { Model } from 'src/common/core/model';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Model {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 250 })
  address: string;

  @Column({ unique: true })
  token: string;
}
