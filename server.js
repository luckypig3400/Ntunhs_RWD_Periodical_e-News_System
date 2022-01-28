const express = require('express');
const app = express();
require('dotenv').config();
const Router = require('./routes/api');

const port = process.env.PORT;
app.use(express.json());
app.use('/periodical', Router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
