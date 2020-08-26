const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const applicantRouter = require('./routes/applicantRouter');

dotenv.config();

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('error connecting db', err));

const app = express();
app.use(express.json());
app.use('/api/applicants', applicantRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
