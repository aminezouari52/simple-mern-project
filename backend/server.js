const mongoose = require('mongoose')
const app = require('./app')

const DB =
  'mongodb+srv://aminezouari52:pK6pAkMQ4fdEJlho@cluster0.hfoy2dy.mongodb.net/simple-mern-app'

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // not supported since v6
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))

app.listen(5000, () => console.log('App running on port 5000...')) // start Node + Express server on port 5000
