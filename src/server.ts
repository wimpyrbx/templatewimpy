import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errors';

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// Middleware
app.use(express.json());
app.use(cors({
    origin: isDev ? 'http://localhost:5173' : process.env.CORS_ORIGIN, // Vite default port in dev
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: !isDev, // Only use secure cookies in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    errorHandler(err, _req, res, _next);
});

app.listen(port, () => {
    console.log(`Server running in ${isDev ? 'development' : 'production'} mode on port ${port}`);
}); 