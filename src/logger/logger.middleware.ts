import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `Logging HTTP request: url:${req.url}, query: ${JSON.stringify(
          req.query,
        )}, body: ${JSON.stringify(req.body)}, response-code: ${
          res.statusCode
        }`,
      );
    });

    next();
  }
}
