import { Sequelize } from "sequelize";
import { env, platform, stdin, stdout } from 'node:process';
import * as readline from "readline";
import { config } from "dotenv";
config();

const dbName = env.SUBD_DB_NAME || 'db';
const dbUser = env.SUBD_DB_USER || 'pguser';
const dbPass = env.SUBD_DB_PASS || 'pgPass';
const dbHost = env.SUBD_DB_HOST || 'localhost';
const dbDialect = env.SUBD_DB_DIALECT || 'postgres';

class DatabaseService {

    sequelize = new Sequelize(
        dbName,
        dbUser,
        dbPass,
        {
            host: dbHost,
            dialect: dbDialect
        }
    );

    constructor(){

        if(platform === "win32") {
            const rl = readline.createInterface({
               input: stdin,
               output: stdout
            });

            rl.on("SIGINT", () => {
                process.emit("SIGINT");
            });
        }

        process.on("SIGINT", async () => {
            try {
                await this.sequelize.close();
                console.log('Disconnected From DB Success');
                process.exit(0);
            } catch (error) {
                console.error('Disconnected From DB Error:', error);
                process.exit(1);
            }
        });

        this.sequelize.authenticate().then(() => {
            console.log('Connection With Database Established Successfully.');
        }).catch((error) => {
            console.error('Sequelize Connection Error:', error);
        });
    }
}

const db = new DatabaseService();

export default db;