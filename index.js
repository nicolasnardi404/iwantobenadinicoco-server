// Import necessary modules
import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'iwantbenicoco',
    password: 'nicoco',
    database: 'poetry_maker'
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

app.get('/', async (req, res) => {
    try {
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


app.get('/generate-poem', async (req, res) => {
    try {
        // choosing a random topic to guide AI
        const randomMessage = [{
            role: 'user',
            content: "Write existential poems about been a machine"
        },
        {
            role: 'user',
            content: "Write poems about machines and love"
        },
        {
            role: 'user',
            content: "Write experimental poems about nonsense topics that make sense in the end"
        },
        {
            role: 'user',
            content: "Craft a poem contemplating the transformation into mushrooms or machines upon death"
        },
        {
            role: 'user',
            content: "Write a a poem reflecting society of the world"
        }
    ]

        function getRandomMessage() {
            const randomIndex = Math.floor(Math.random() * randomMessage.length);
            return randomMessage[randomIndex];
        }

        const chooseMessage = getRandomMessage()
        console.log(chooseMessage);

        const messages = [{
            role:"system",
            content:"You are a poetry machine that makes poems max 20 lines"
        }, chooseMessage
            ];
        const response = await openai.chat.completions.create({
            model: 'ft:gpt-3.5-turbo-0125:personal:copynicv-3:9UtycjS0',
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
