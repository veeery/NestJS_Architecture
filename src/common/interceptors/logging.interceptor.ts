import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest() as Request;
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        const bodyCount = Object.keys(req.body).length;
        const queryCount = Object.keys(req.query).length;

        if (bodyCount) {
            Logger.log("Request Body", `${context.getClass().name}`, false)
        }
        
        if (queryCount) {
            Logger.log("Request Query", `${context.getClass().name}`, false)
            console.log(req.query)
        }
        return next.handle().pipe(tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)));
    }
}