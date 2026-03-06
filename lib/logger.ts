type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogPayload {
  [key: string]: unknown;
}

const isProd = process.env.NODE_ENV === 'production';

function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function log(level: LogLevel, message: string, data?: LogPayload) {
  const entry = {
    level,
    msg: message,
    ts: new Date().toISOString(),
    ...data,
    ...(data?.error ? { error: formatError(data.error) } : {}),
  };

  if (isProd) {
    const method = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    console[method](JSON.stringify(entry));
  } else {
    const tag = `[${level.toUpperCase()}]`;
    const method = level === 'error' ? 'error' : level === 'warn' ? 'warn' : level === 'debug' ? 'debug' : 'log';
    if (data && Object.keys(data).length > 0) {
      console[method](tag, message, data);
    } else {
      console[method](tag, message);
    }
  }
}

export const logger = {
  debug: (msg: string, data?: LogPayload) => log('debug', msg, data),
  info:  (msg: string, data?: LogPayload) => log('info', msg, data),
  warn:  (msg: string, data?: LogPayload) => log('warn', msg, data),
  error: (msg: string, data?: LogPayload) => log('error', msg, data),
};
