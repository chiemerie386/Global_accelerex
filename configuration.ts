import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // password: process.env.DB_PASSWORD,


}));
