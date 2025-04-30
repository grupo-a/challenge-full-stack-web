require("dotenv").config()
const app = require("./app")
const logger = require("./utils/logger")

const PORT = process.env.PORT || 3050

process.on("uncaughtException", (error) => {
  logger.error("Exceção não tratada:", error)
  process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Rejeição não tratada em:", promise, "motivo:", reason)
  process.exit(1)
})

const server = app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`)
})

process.on("SIGTERM", () => {
  logger.info("SIGTERM recebido, encerrando de forma controlada")
  server.close(() => {
    logger.info("Processo finalizado")
  })
})

module.exports = server
