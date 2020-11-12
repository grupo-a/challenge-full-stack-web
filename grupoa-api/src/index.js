import express from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';

import 'dotenv/config';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(helmet());

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
