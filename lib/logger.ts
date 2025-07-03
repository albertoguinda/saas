export const logger = {
  /**
   * Log an error message. Abstracted from console.error so it can be replaced
   * or mocked in the future.
   */
  // eslint-disable-next-line no-console
  error: (...args: unknown[]) => console.error(...args),
};
