import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = process.env.PORT || 3330;

const app = express();

app.listen(port, async () => {
  console.log(`Running on port ${port}`);
});
