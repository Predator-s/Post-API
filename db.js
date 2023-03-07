const mongoose = require('mongoose');

mongoose.connect('<mongodb_connection_string>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
