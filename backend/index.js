const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const connectDB = require('./src/config/connect_DB');
const authRouter = require('./src/routes/authRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use('uploads', express.static('src/uploads'))
app.use('/api/v1/auth', authRouter);

connectDB(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
    console.log('App is running on port '+process.env.PORT);
})