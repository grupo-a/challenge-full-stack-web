const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const models = require('./models')

// Import routes
const enrollRoutes = require('./routes/enroll-routes');

app.use(
  bodyParser.json({ limit: '50mb', extended: true }),
  cors({
    origin: '*',
  })
)

app.use('/enroll', enrollRoutes)

models.sequelize.sync()

app.listen(process.env.PORT || 3000, function () {
  console.log('active on port 3000!')
});
