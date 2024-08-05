// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database.js';

dotenv.config();


const app = express();
app.listen (3000, () => {
    connectToDatabase();
    console.log(' Server started on http://localhost:3000');
});

app.get ('/products', (req, res) => {
    res.send('Hello World');
} );



