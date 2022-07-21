require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

const Student = require('./controllers/StudentController');

app.get('/status', (req, res) => {
  res.json({ message: 'API online!' });
});

app.get('/student', Student.index);
app.get('/student/:id', Student.show);
app.post('/student', Student.store);
app.put('/student/:id', Student.update);
app.delete('/student/:id', Student.destroy);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
