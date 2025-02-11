export default () => {
  process.env = {
    NODE_ENV: 'test',
    HTTP_PORT: '3000',
    JWT_SECRET: 'secret',
    TYPEORM_DATABASE: 'postgres',
    TYPEORM_PORT: '5432',
    TYPEORM_HOST: 'localhost',
    TYPEORM_USERNAME: 'root',
    TYPEORM_PASSWORD: 'root',
  };
};
