import { env } from "@/common/config/env";
import app from "@/common/infrastructure/http/app";

async function startServer() {
  app.listen(env.PORT, () => {
    console.log("Server is running on port ", env.PORT);
    console.log(`API docs available at GET ${env.API_URL}/api/docs`);
  });
}
startServer();
