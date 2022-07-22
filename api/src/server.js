require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

const router = require('./routes');

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
