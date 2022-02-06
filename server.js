require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Router = require('./routes/api');

const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.WEB_ORIGIN_URL }));
app.use(cookieParser());

app.use('/periodical/api', Router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
