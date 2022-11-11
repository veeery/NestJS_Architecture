import { InternalServerErrorException } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { User } from 'src/modules/public/user/user.entity';
import { UserRequest } from '../interfaces/request.interface';
import * as cls from 'cls-hooked';

export class RequestContext {
  public static readonly namespace = 'request-session';
  public readonly id: number;
  public user: User;

  constructor(request: UserRequest) {
    this.id = ContextIdFactory.getByRequest(request).id;
    this.user = request.user;
  }

  // static create(request: UserRequest) {
  //   const context = new RequestContext(request);
  //   const session =
  //     cls.getNamespace(RequestContext.namespace) ||
  //     cls.createNamespace(RequestContext.namespace);
  //   session.runPromise(async () => {
  //     session.set(RequestContext.name, context);
  //   });
  //   return context.tenant;
  // }

  static get context(): RequestContext {
    const session = cls.getNamespace(RequestContext.namespace);
    if (session && session.active) return session.get(RequestContext.name);
    throw new InternalServerErrorException('User session not found');
  }

  static get id(): number {
    const context = RequestContext.context;
    return context.id;
  }

  static get user(): User {
    const context = RequestContext.context;
    return context.user;
  }
}
