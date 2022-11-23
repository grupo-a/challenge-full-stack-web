export default (loggerLib) => {
  const logger = loggerLib.createLogger({
    format: loggerLib.format.combine(
      loggerLib.format.errors({ stack: true }),
      loggerLib.format.json()
    ),
    transports: [new loggerLib.transports.Console({ format: loggerLib.format.simple() })]
  })
  return logger
}
