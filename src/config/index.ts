import { app } from './app.config';
import { orm } from './orm.config';
import { jwt } from './jwt.config';
import { jwtRefresh } from './jwt-refresh.config';

export const config = [app, orm, jwt, jwtRefresh];
