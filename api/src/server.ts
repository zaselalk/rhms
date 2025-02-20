import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// env variables
const PORT:number = parseInt(process.env.APPLICATION_PORT as string, 10) || 3001;
const app:Application = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

