import { UsersService } from './users.service';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  constructor(private readonly users: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe();
  }
}
