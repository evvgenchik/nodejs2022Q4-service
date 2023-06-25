const LOG_LEVEL_VALUES = {
  debug: 0,
  verbose: 1,
  log: 2,
  warn: 3,
  error: 4,
};

const DEFAULT_LOG_LEVELS = ['log', 'error', 'warn', 'debug', 'verbose'];

export const isLogEnable = (targetLevel: string): boolean => {
  const demandedLogLevel = process.env.LOGS_LEVEL || 'log';

  if (!DEFAULT_LOG_LEVELS.includes(demandedLogLevel)) return true;

  return LOG_LEVEL_VALUES[targetLevel] >= LOG_LEVEL_VALUES[demandedLogLevel];
};
