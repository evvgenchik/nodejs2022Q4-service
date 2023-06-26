import { LoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { isLogEnable } from './utils';

const COLOR = {
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  GREEN: '\x1b[32m',
  GREY: '\x1b[0m',
};

const MESSAGES = {
  ERROR: 'Error: ',
  LOG: 'Logging HTTP request: ',
  WARN: 'WARN: ',
};

export class MyLogger implements LoggerService {
  log(message: any) {
    if (!isLogEnable('log')) return;

    console.log(COLOR.GREEN + MESSAGES.LOG + message + COLOR.GREY);
    this.logToFile(MESSAGES.LOG + message);
  }

  error(message: any) {
    if (!isLogEnable('error')) return;

    console.log(COLOR.RED + MESSAGES.ERROR + message + COLOR.GREY);
    this.errorToFile(MESSAGES.ERROR + message);
  }

  warn(message: any) {
    if (!isLogEnable('warn')) return;

    console.log(COLOR.YELLOW + MESSAGES.WARN + message + COLOR.GREY);
    this.logToFile(MESSAGES.WARN + message);
  }

  debug?(message: any) {
    if (!isLogEnable('warn')) return;

    console.log(COLOR.YELLOW + MESSAGES.WARN + message + COLOR.GREY);
    this.logToFile(MESSAGES.WARN + message);
  }

  verbose?(message: any) {
    if (!isLogEnable('warn')) return;

    console.log(COLOR.YELLOW + MESSAGES.WARN + message + COLOR.GREY);
    this.logToFile(MESSAGES.WARN + message);
  }

  private logToFile = async (log: string): Promise<void> => {
    const currentLogsFile = path.join('logs', `logs.txt`);
    const timestamp = new Date().getTime().toString();

    try {
      const maxFileSize = process.env.MAX_LOGS_FILESIZE || 5000;
      const file = await fs.promises.stat(currentLogsFile);
      const fileSize = file.size;

      if (fileSize > +maxFileSize) {
        fs.promises.rename(
          currentLogsFile,
          path.join('logs', `${timestamp}-logs.txt`),
        );
        throw new Error('Max size file');
      }
    } catch (err) {
      await fs.promises.mkdir(path.join('logs'), {
        recursive: true,
      });
    } finally {
      fs.appendFile(currentLogsFile, log + '\n', 'utf8', (err) => {
        if (err) throw err;
      });
    }
  };

  private errorToFile = async (log: string): Promise<void> => {
    const currentLogsFile = path.join('logs', 'errors', `errors.txt`);
    const timestamp = new Date().getTime().toString();

    try {
      const maxFileSize = process.env.MAX_LOGS_FILESIZE || 5000;
      const file = await fs.promises.stat(currentLogsFile);
      const fileSize = file.size;

      if (fileSize > +maxFileSize) {
        fs.promises.rename(
          currentLogsFile,
          path.join('logs', 'errors', `${timestamp}-errors.txt`),
        );
        throw new Error('Max size file');
      }
    } catch (err) {
      await fs.promises.mkdir(path.join('logs', 'errors'), {
        recursive: true,
      });
    } finally {
      fs.appendFile(currentLogsFile, log + '\n', 'utf8', (err) => {
        if (err) throw err;
      });
    }
  };
}
