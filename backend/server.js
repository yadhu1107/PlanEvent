import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import eventRoutes from './routes/events.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/events', eventRoutes);

app.get('/', (_request, response) => {
  response.json({ message: 'PlanEvent API is running.' });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.startsWith('replace_')) {
      throw new Error('Set MONGODB_URI in backend/.env to your test MongoDB Atlas connection string.');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas.');
    app.listen(port, () => console.log(`API server running at http://localhost:${port}`));
  } catch (error) {
    console.error(`Server could not start: ${error.message}`);
    process.exit(1);
  }
}

startServer();
