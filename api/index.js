import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyCtRcQFKGKgS31KIHTVlVIDGR3fSIgcS-k");


app.post('/api/chat', async  (req, res) => {
    try {
        console.log(req.body.history);
        console.log(req.body.message);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

       const chat = model.startChat({
        history: req.body.history
       });
       const msg = "Convert the following query into appropriate Git commands: " + req.body.message;

       const result = await chat.sendMessage(msg);
       const response =  result.response;
       const text = response.text();
       res.send(text);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

