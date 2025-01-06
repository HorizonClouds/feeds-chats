// server.js

import express from 'express'; // Import Express framework
import mongoose from 'mongoose'; // Import Mongoose for MongoDB
import { swaggerSetup } from './swagger.js'; // Import Swagger setup
import interestFilterApiRouter from './routes/interestFilterRoute.js'; // Import API routes
import itinerariesFeedApiRouter from './routes/itinerariesFeedRoute.js'; // Import API routes
import dotenv from 'dotenv'; // Import dotenv for environment variables
import standardizedResponse from './middlewares/standardResponse.js'; // Import custom response middleware
import { MongoMemoryServer } from 'mongodb-memory-server';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors'; // Import CORS middleware
import './utils/logger.js';
import config from './config.js';

dotenv.config(); // Load environment variables

const app = express(); // Create an Express application
const port = config.backendPort; // Define port

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(standardizedResponse); // Use custom response middleware
app.use(cors());

// Routes
app.use('/api/v1', interestFilterApiRouter);
app.use('/api/v1', itinerariesFeedApiRouter);

app.get('/', (req, res) => {
  // Redirect to API documentation
  res.redirect('/api-docs');
});

app.use(errorHandler);

// Swagger configuration
swaggerSetup(app);

// Connect to MongoDB
let mongoURI = config.mongoUri;
if (config.nodeEnv === 'test') {
  const mongod = new MongoMemoryServer(); // Fake MongoDB for testing
  await mongod.start();
  mongoURI = mongod.getUri();
  console.log(mongoURI);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message);
  });



// Start server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  logger.info(
    `API documentation is available at http://localhost:${port}/api-docs`
  );
});

export default app; // Export the Express application
