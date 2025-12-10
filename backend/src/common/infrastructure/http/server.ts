import app from "@/common/infrastructure/http/app";
import "dotenv/config";

async function startServer() {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
    console.log(`API docs available at GET ${process.env.API_URL}/api/docs`);
  });
}
startServer();
