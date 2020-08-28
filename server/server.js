const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const applicationRouter = require('./routes/applicationRouter');
const postRouter = require('./routes/postRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const bodyParser = require('body-parser');

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
app.use(cors());
app.use(morgan('dev'));
// app.use(bodyParser());
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/applications', applicationRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
