/**
 * @typedef {'debug' | 'info' | 'warn' | 'error'} LogLevel
 *
 * @typedef {Object} LoggerOptions
 * @property {boolean} [enableConsole=true] - Enable console logging
 * @property {boolean} [enableFile=false] - Enable file logging
 * @property {LogLevel} [logLevel='info'] - Minimum log level
 * @property {boolean} [silent=false] - Suppress all logging
 * @property {Object} [metadata] - Global metadata options
 * @property {boolean} [metadata.timestamp=true] - Include timestamps
 * @property {boolean} [metadata.correlationId=true] - Include correlation IDs
 */

class Logger {
  /**
   * @param {string} context - The context/service name using the logger
   * @param {LoggerOptions} [options={}] - Logger configuration options
   */
  constructor(context, options = {}) {
    this.context = context;
    this.options = {
      enableConsole: true,
      enableFile: false,
      logLevel: "info",
      silent: process.env.NODE_ENV === "test",
      metadata: {
        timestamp: true,
        correlationId: true,
      },
      ...options,
    };
  }

  /**
   * @private
   * @param {LogLevel} level
   * @returns {boolean}
   */
  #shouldLog(level) {
    if (this.options.silent) return false;
    const levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[level] >= levels[this.options.logLevel];
  }

  /**
   * @private
   * @param {LogLevel} level
   * @param {string} message
   * @param {Object} [meta={}]
   * @returns {Object}
   */
  #formatMessage(level, message, meta = {}) {
    const baseMessage = {
      timestamp: this.options.metadata.timestamp
        ? new Date().toISOString()
        : undefined,
      level,
      context: this.context,
      message,
      correlationId: this.options.metadata.correlationId
        ? meta.correlationId
        : undefined,
      ...meta,
    };

    // Remove undefined values
    return Object.fromEntries(
      Object.entries(baseMessage).filter(([_, value]) => value !== undefined)
    );
  }

  /**
   * @private
   * @param {LogLevel} level
   * @param {string} message
   * @param {Object} [meta={}]
   */
  #log(level, message, meta = {}) {
    if (!this.#shouldLog(level)) return;

    const logMessage = this.#formatMessage(level, message, meta);
    const formattedMessage = JSON.stringify(logMessage, null, 2);

    if (this.options.enableConsole) {
      switch (level) {
        case "debug":
          console.debug(formattedMessage);
          break;
        case "info":
          console.info(formattedMessage);
          break;
        case "warn":
          console.warn(formattedMessage);
          break;
        case "error":
          console.error(formattedMessage);
          break;
      }
    }
  }

  /**
   * @param {string} message
   * @param {Object} [meta]
   */
  debug(message, meta) {
    this.#log("debug", message, meta);
  }

  /**
   * @param {string} message
   * @param {Object} [meta]
   */
  info(message, meta) {
    this.#log("info", message, meta);
  }

  /**
   * @param {string} message
   * @param {Object} [meta]
   */
  warn(message, meta) {
    this.#log("warn", message, meta);
  }

  /**
   * @param {string} message
   * @param {Object} [meta]
   */
  error(message, meta) {
    // Add stack trace for errors if an error object is provided
    const errorMeta =
      meta?.error instanceof Error
        ? {
            ...meta,
            stack: meta.error.stack,
            name: meta.error.name,
          }
        : meta;

    this.#log("error", message, errorMeta);
  }

  /**
   * Updates logger options
   * @param {Partial<LoggerOptions>} newOptions
   */
  updateOptions(newOptions) {
    this.options = {
      ...this.options,
      ...newOptions,
      metadata: {
        ...this.options.metadata,
        ...newOptions.metadata,
      },
    };
  }

  /**
   * Creates a child logger with inherited options and additional context
   * @param {string} childContext
   * @param {Partial<LoggerOptions>} [childOptions]
   * @returns {Logger}
   */
  child(childContext, childOptions = {}) {
    const context = `${this.context}:${childContext}`;
    const options = {
      ...this.options,
      ...childOptions,
      metadata: {
        ...this.options.metadata,
        ...childOptions.metadata,
      },
    };
    return new Logger(context, options);
  }
}

export default Logger;
