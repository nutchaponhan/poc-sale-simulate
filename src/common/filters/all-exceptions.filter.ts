import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseException } from '../exceptions/base.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: any = {
      status: status,
      timestamp: new Date().toISOString(),
      message: 'Internal server error',
    };

    console.log({ exception });

    if (exception instanceof BaseException) {
      const response = exception.getResponse() as any;
      responseBody = {
        ...response,
      };
      status = exception.getStatus();
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse() as any;
      responseBody = {
        status: status,
        timestamp: new Date().toISOString(),
        message: response.message || response,
        ...(typeof response === 'object' ? response : {}),
      };
    } else if (exception instanceof Error) {
      responseBody.message = exception.message;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
