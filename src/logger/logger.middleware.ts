import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new MyLogger(`HTTP`);

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
        return this.logger.error(message, statusCode);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);

      // this.logger.log(
      //   `Logging HTTP request: url:${req.url}, query: ${JSON.stringify(
      //     req.query,
      //   )}, body: ${JSON.stringify(req.body)}, response-code: ${
      //     res.statusCode
      //   }`,
      // );
    });

    // res.on('error', () => {
    //   this.logger.log(
    //     `Error: url:${req.url}, query: ${JSON.stringify(
    //       req.query,
    //     )}, body: ${JSON.stringify(req.body)}, response-code: ${
    //       res.statusCode
    //     }`,
    //   );
    // });

    next();
  }
}
