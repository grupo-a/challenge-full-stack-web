const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/auth');

class Application {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeDatabase();
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        this.app.get('/api/health', (req, res) => {
            res.json({ 
                status: 'OK', 
                message: 'Server is running',
                timestamp: new Date().toISOString()
            });
        });

        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/students', authMiddleware, studentRoutes);

        // 404 Handler - CORRIGIDO
        this.app.use((req, res) => {
            res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        });

        this.app.use((error, req, res, next) => {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        });
    }

    async initializeDatabase() {
        try {
            await database.testConnection();
            await database.syncModels(false);
        } catch (error) {
            console.error('Failed to initialize database:', error);
        }
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const application = new Application();
application.start();