import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter as BaseExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class ExceptionFilter implements BaseExceptionFilter {
  /**
   * Global exception handler
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let data: any = null;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof BadRequestException) {
      statusCode = HttpStatus.BAD_REQUEST;
      data = (exception.getResponse() as any).message;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
    } else if (exception instanceof EntityNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND;
    }

    let message = 'Whoops, looks like something went wrong';
    switch (statusCode) {
      case 400:
        message = 'Bad Request';
        break;
      case 401:
        message = 'Unauthorized';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Not Found';
        break;
      case 405:
        message = 'Method Not Allowed';
        break;
      case 422:
        message = 'Form error';
        break;
    }

    const resJson = { message, data: data, extras: {} };

    if (process.env.APP_DEBUG === 'true') {
      resJson.extras = {
        message: exception.message ?? null,
        trace: exception.stack,
      };
    }

    response.status(statusCode).json(resJson);
  }
}
