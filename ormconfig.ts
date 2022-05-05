import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
const dotenv = require('dotenv')
dotenv.config()
const config:MysqlConnectionOptions = {
    type:'mysql',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities:['dist/src/**/*.entity.js'],
    synchronize:false,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
  }
export default config
