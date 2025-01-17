import {
    Catch, 
    ExceptionFilter,
    HttpException,
    ArgumentsHost,
    Logger,
} from '@nestjs/common';
import { DateTime } from 'luxon';

/**
 * - Exception filters give full control over the exceptions layer
 * - Add Logging
 * - Control exact flow of control and the content of the response sent
 * - This filter is responsible for catching exceptions which are an instance of the HttpException
 * - Grants us access to the underlying platform 'Request' & 'Response' objects
 */
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter<HttpException> {
    /**
     * **summary**: Access the appropriate underlying arguments for any execution context with ArgumentHost
     * @param {} exception
     * @param {ArgumentsHost} host
     */
    catch = (exception: HttpException, host: ArgumentsHost): void => {
      const context = host.switchToHttp();
      const request = context.getRequest();
      const response = context.getResponse();
      const status = exception.getStatus();
  
      /**
       * Error responses
       */
      const errorResponse = {
        http_code: status,
        timestamp: DateTime.local(),
        path: request.url,
        method: request.method,
        cause: exception.cause,
        message: exception.message  || null,
        stack: exception.stack
      };
  
      /**
       * Error logging
       */
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'ExceptionFilter',
      );
  
      /**
       * Take direct control of the response with the json method
       */
      response.status(status).json(errorResponse);
    }
  }