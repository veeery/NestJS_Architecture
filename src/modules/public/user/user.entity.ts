import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'src/common/core/model';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { History } from '../history/history.entity';

@Entity()
export class User extends Model {
  @Column({ length: 200 })
  name: string;

  @Column({ unique: true, length: 35 })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  public currentHashedRefreshToken: string;

  @OneToMany(() => History, (history) => history.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  history: History[];

  token?: string;

  get passSalt(): string {
    return this.password.substr(0, 29);
  }

  get tokenSalt(): string {
    if (this.currentHashedRefreshToken === null) {
      throw new UnauthorizedException();
    }
    return this.currentHashedRefreshToken.substr(0, 29);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(password: string) {
    const hash = await bcrypt.hash(password, this.passSalt);
    return hash === this.password;
  }

  @BeforeUpdate()
  async hashRefreshToken() {
    if (!this.currentHashedRefreshToken) return;
    const salt = await bcrypt.genSalt();
    this.currentHashedRefreshToken = await bcrypt.hash(
      this.currentHashedRefreshToken,
      salt,
    );
  }

  async validateRefreshToken(currentHashedRefreshToken: string) {
    const hash = await bcrypt.hash(currentHashedRefreshToken, this.tokenSalt);
    return hash === this.currentHashedRefreshToken;
  }

  toJson() {
    delete this.currentHashedRefreshToken;
    delete this.password;
    delete this.token;
    return this;
  }
}
