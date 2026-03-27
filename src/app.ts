import express, { type Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { createServer } from "http";
import { setupSocket } from "./lib/io";
import { swaggerSpec } from './config/swagger';
import authRoutes from './modules/auth/auth.routes';
import onboardingRoutes from './modules/onboarding/onboarding.routes';
import doctorRoutes from './modules/doctors/doctors.routes';
import chatRoutes from './modules/chat/chat.routes';

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const port = process.env.PORT || 4001;

// Initialize Socket.io
setupSocket(httpServer);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/onboarding', onboardingRoutes);
app.use('/doctors', doctorRoutes);
app.use('/chat', chatRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Medical Platform API! Visit /api-docs for documentation.");
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
