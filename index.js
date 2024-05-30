// Import necessary modules
import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
app.use(cors());

// Create a MySQL connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'iwantbenicoco',
    password: 'nicoco',
    database: 'poetry_maker'
});

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

// Route to fetch all poems
app.get('/', async (req, res) => {
    try {
        // Query to select all poems from the database
        const query = 'SELECT * FROM poems';
        db.query(query, (err, results) => {
            if (err) {
                throw err;
            }

            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// New endpoint for generating a poem
app.get('/generate-poem', async (req, res) => {
    try {
        const messages = [{
            role: 'user',
            content: 'Make a poem'
        }];
        const response = await openai.chat.completions.create({
            model: 'ft:gpt-3.5-turbo-0125:personal:my-experiment-4:9SP3ezOl',
            messages: messages
        });
        const poemGenerated = response.choices[0].message.content;

        const query = 'INSERT INTO poems(poem) VALUES(?)';
        db.query(query, [poemGenerated], (err, results) => {
            if (err) {
                throw err;
            }
            res.json({ message: `Poem inserted with ID: ${results.insertId}`, poem: poemGenerated });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
