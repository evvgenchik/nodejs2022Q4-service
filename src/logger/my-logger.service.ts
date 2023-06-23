import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    console.log(`\x1b[32m Logging HTTP request: ${message} \x1b[0m`);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(`\x1b[31m Error: ${message} \x1b[0m`);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(`\x1b[33m Warn: ${message} \x1b[0m`);
  }
}
