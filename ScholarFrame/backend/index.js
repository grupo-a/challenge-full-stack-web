require('dotenv').config(); //Load environment variables
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); //For hashing passwords
const jwt = require('jsonwebtoken'); //For generating tokens

const app = express();

app.use(express.json());
app.use(cors());

//Database Configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'escola_db',
  password: '8619',
  port: 5432,
});

// AUTHENTICATION GUARD
//This function intercepts the request to check if the user has a valid Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //Token usually comes as "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'ACCESS_DENIED', message: 'Token not provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'INVALID_TOKEN', message: 'Token is invalid or expired.' });
    
    req.user = user; //Add user info to the request
    next(); //Pass to the next function
  });
};

//PUBLIC ROUTES

//REGISTER
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Hash the password (encrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Save to DB
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

//LOGIN (To get the Token)
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    //Check if user exists
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'USER_NOT_FOUND', message: 'Invalid credentials.' });
    }

    const user = userResult.rows[0];

    //Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'INVALID_PASSWORD', message: 'Invalid credentials.' });
    }

    //Generate Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login error' });
  }
});

//PROTECTED ROUTES

app.get('/students', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching students' });
  }
});

app.post('/students', authenticateToken, async (req, res) => {
  const { ra, name, email, cpf } = req.body;
  try {
    const newStudent = await pool.query(
      'INSERT INTO students (ra, name, email, cpf) VALUES ($1, $2, $3, $4) RETURNING *',
      [ra, name, email, cpf]
    );
    res.status(201).json(newStudent.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
       return res.status(409).json({ error: 'DUPLICATE', message: 'Data already exists.' });
    }
    res.status(500).json({ error: 'Error creating student' });
  }
});

app.put('/students/:ra', authenticateToken, async (req, res) => {
    const { ra } = req.params;
    const { name, email } = req.body;
    try {
        await pool.query('UPDATE students SET name = $1, email = $2 WHERE ra = $3', [name, email, ra]);
        res.json({ message: 'Updated' });
    } catch (e) { res.status(500).send() }
});

app.delete('/students/:ra', authenticateToken, async (req, res) => {
    const { ra } = req.params;
    try {
        await pool.query('DELETE FROM students WHERE ra = $1', [ra]);
        res.json({ message: 'Deleted' });
    } catch (e) { res.status(500).send() }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});