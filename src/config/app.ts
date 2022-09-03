function loadEnv() {
	return {
		PORT: Number(process.env.PORT) || 3000,
		NODE_ENV: process.env.NODE_ENV || "development",
		LOG_LEVEL: process.env.LOG_LEVEL || "debug",
		JWT_SECRET: process.env.JWT_SECRET || "secret",
		CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3001",
	}
}

export const env = loadEnv()

export const isProduction = () => env.NODE_ENV === "production"
