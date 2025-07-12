export const logger = {
  // eslint-disable-next-line no-console
  error: (...args: unknown[]) => console.error(...args),
  // eslint-disable-next-line no-console
  info: (...args: unknown[]) => console.log(...args),
  // eslint-disable-next-line no-console
  warn: (...args: unknown[]) => console.warn(...args),
};
