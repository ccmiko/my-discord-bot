import environment, { ENV_KEY } from "@/utils/env";
import { v4 as uuidv4 } from 'uuid';
import pino, { Logger as PinoLogger } from 'pino';

const env = environment();
const envlogLevel = env.getString(ENV_KEY.LOG_LEVEL)
const checkLogLevel = (targetLoglevel: string): boolean => {
  const logLevels: {
    [logLevel: string]: number;
  } = {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  };
  const settingLogLevel = logLevels[envlogLevel];
  const logLevel = logLevels[targetLoglevel];

  return settingLogLevel >= logLevel;
};

type Logger = {
  create: (uniqueValue?: string) => void;
  getReqId: () => string;
  error: (message: any) => void;
  warn: (message: any) => void;
  info: (message: any) => void;
  debug: (message: any) => void;
}

const pinoLogger: PinoLogger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  level: envlogLevel,
})

const _logger = (): Logger => {
  let reqId: string;
  let _logger: PinoLogger = pinoLogger
  let logger: PinoLogger

  return {
    create: (uniqueValue: string = '') => {
      reqId = uniqueValue || uuidv4();
      logger = _logger.child({ reqId });
    },
    getReqId: () => reqId,
    error: (message: any) => {
      if (checkLogLevel('error')) logger.error(message);
    },
    warn: (message: any) => {
      if (checkLogLevel('warn')) logger.warn(message);
    },
    info: (message: any) => {
      if (checkLogLevel('info')) logger.info(message);
    },
    debug: (message: any) => {
      if (checkLogLevel('debug')) logger.debug(message);
    },
  };
};
const logger: Logger = _logger();

export { logger }
export type { Logger }
