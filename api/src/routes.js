const express = require('express');
const router = express.Router();
const Student = require('./controllers/StudentController');

router.get('/status', (req, res) => {
  res.json({ message: 'API online!' });
});

router.get('/student', Student.index);
router.get('/student/:id', Student.show);
router.post('/student', Student.store);
router.put('/student/:id', Student.update);
router.delete('/student/:id', Student.destroy);

module.exports = router;
