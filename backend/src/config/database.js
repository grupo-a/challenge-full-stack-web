const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        
       this.sequelize = new Sequelize(
    '',
    'postgres', 
    '5UJFQvvN6NCeiRv',
    {
                host: 'databaseqa.ci3ykwsu2ec8.us-east-1.rds.amazonaws.com',
                port: 5432,
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                logging: process.env.NODE_ENV === 'development' ? console.log : false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                define: {
                    timestamps: true,
                    underscored: true
                }
            }
        );
        
        Database.instance = this;
    }
    
    async testConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection established successfully.');
            return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
    }
    
    async syncModels(force = false) {
        try {
            await this.sequelize.sync({ force: false });
            console.log('Database models synchronized.');
        } catch (error) {
            console.error('Error synchronizing models:', error);
        }
    }
    
}

module.exports = new Database();
