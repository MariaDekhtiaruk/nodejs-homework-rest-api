const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// module.exports = app;
// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });
