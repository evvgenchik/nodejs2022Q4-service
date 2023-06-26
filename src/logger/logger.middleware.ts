import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new MyLogger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl, body, query } = req;
      const { statusCode, statusMessage } = res;
      const date = new Date().toISOString();

      const message = `- ${date} - ${method}, url: ${originalUrl}, query: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(
        body,
      )}, response-code: ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}
