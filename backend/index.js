const express = require('express');
const webpush = require('web-push');
const cors = require('cors')
const connectToMongoDB = require('./db-connection');

const app = express();

app.use(cors());
app.use(express.json());

connectToMongoDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})