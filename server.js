require('dotenv').config();
const express = require('express');
const app = express();

const Router = require('./routes/api');

const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/periodical', Router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
