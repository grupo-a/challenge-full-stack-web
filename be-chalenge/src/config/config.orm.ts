import {createConnection, Connection} from "typeorm";
import { Student } from "../entities/student.entity";

export class OrmConfig {

    static connection?: Connection;

    static async connect(){
        try {
            const type: any = process.env.DB_TYPE;
            OrmConfig.connection = await createConnection(
                {
                    type,
                    host: process.env.DB_HOST,
                    port: Number(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    synchronize: true,
                    entities: [
                        Student
                    ],
                }

            );
    
            if(!OrmConfig.connection.isConnected){
                await OrmConfig.connection.connect();
            }
        } catch (error) {
            console.log('Erro ao conectar ao banco de dados: ', error.message);
        }
    }
}