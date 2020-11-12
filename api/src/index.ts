import app from './app';
import connection from './database/connection';

connection.create();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
