const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const index = require('./routes/index');
const { signin, signup } = require('./controllers/users');
const { signUpValidation, signInValidation } = require('./validation/validation');

mongoose.set('strictQuery', false);
const app = express();
const PORT = 3000;
mongoose.set('runValidators', true);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) { console.log(err); } else console.log('MongoDB is connected');
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sign-up', signUpValidation, signup);
app.post('/sign-in', signInValidation, signin);

app.use(index);

app.listen(PORT, (error) => (error ? console.error(error) : console.log(`App listening on port ${PORT}`)));
