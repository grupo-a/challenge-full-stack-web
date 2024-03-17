
import express, { Application } from 'express';
import LoggerService from "./services/LoggerService";
import adminRouter from './adapters/adminRouter';
import studentRouter from './adapters/studentRouter';

const app: Application = express();

const port = process.env.PORT || 3000;
app.use(express.json());

const loggerService = new LoggerService();
app.use(loggerService.getLoggerMiddleware());

app.use('/admin', adminRouter);
app.use('/student', studentRouter);

app.listen(port, () => {
  loggerService.logInfo(`Server is running on port ${port}`);
});
